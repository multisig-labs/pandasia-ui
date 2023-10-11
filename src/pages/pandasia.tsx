import { useGetAirdrops } from '@/async_fns/wagmi';
import AirdropCard from '@/components/Cards/AirdropCard/AirdropCard';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import NotAuthorized from '@/components/Pages/NotAuthorized/NotAuthorized';
import { supabase } from '@/config/supabase';
import { useC2PAuth } from '@/hooks/useC2PAuth';
import { CombinedAirdrop, SupabaseReturnType } from '@/types/pandasia';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SupabaseMap {
  [id: number]: SupabaseReturnType;
}

export default function Pandasia() {
  const [hydratedAirdrops, setHydratedAirdrops] = useState<CombinedAirdrop[]>([]);
  const [supabaseMap, setSupabaseMap] = useState<SupabaseMap>({});
  const [isClient, setIsClient] = useState(false);
  const { pChainAddr } = useC2PAuth();

  // Get contract data data
  const {
    data: contractAirdrops,
    isLoading: contractAirdropsIsLoading,
    isError: contractAirdropsIsError,
    error: contractAirdropsError,
  } = useGetAirdrops(BigInt(0), BigInt(0));

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get supabase data
  useEffect(() => {
    getAirdrops();
  }, []);

  // Combine contract and supabase airdrops to one combined airdrop
  useEffect(() => {
    if (Object.keys(supabaseMap).length == 0) {
      return;
    }
    if (!contractAirdrops || contractAirdrops.length == 0) {
      return;
    }

    let tempHydrated: CombinedAirdrop[] = [];

    contractAirdrops.forEach((contractAirdrop) => {
      if (!supabaseMap[Number(contractAirdrop.id)]) {
        return;
      }

      const hydratedAirdrop: CombinedAirdrop = {
        id: supabaseMap[Number(contractAirdrop.id)].id,
        contractId: contractAirdrop.id,
        owner: contractAirdrop.owner,
        erc20: contractAirdrop.erc20,
        claimAmount: contractAirdrop.claimAmount,
        root: contractAirdrop.root,
        expiresAt: contractAirdrop.expires,
        onlyRegistered: contractAirdrop.onlyRegistered,
        companyName: supabaseMap[Number(contractAirdrop.id)].airdrop_info.company_name,
        summary: supabaseMap[Number(contractAirdrop.id)].airdrop_info.summary,
        description: supabaseMap[Number(contractAirdrop.id)].airdrop_info.description,
        url: supabaseMap[Number(contractAirdrop.id)].airdrop_info.url,
        logo: supabaseMap[Number(contractAirdrop.id)].airdrop_info.logo,
      };

      tempHydrated.push(hydratedAirdrop);
    });

    setHydratedAirdrops(tempHydrated);
  }, [supabaseMap, contractAirdrops]);

  if (contractAirdropsIsLoading && isClient) {
    return (
      <LayoutAndNavbar>
        <div>Loading!</div>;
      </LayoutAndNavbar>
    );
  }

  if (contractAirdropsIsError && isClient) {
    return (
      <LayoutAndNavbar>
        <div>Error!</div>;
      </LayoutAndNavbar>
    );
  }

  // function to load airdrops from supabase
  async function getAirdrops() {
    const query = await supabase.from('airdrop_to_contract').select(
      `
        id, 
        contract_id,
        airdrop_info (
          company_name,
          summary,
          description,
          url,
          logo
        )
    `,
    );
    if (query.error) {
      console.warn('Error fetching data from supabase', query.error);
    }

    if (query.data == null) {
      console.warn('No data returned from supabase');
      return;
    }

    const airdrops: SupabaseReturnType[] = query.data;
    let pMap: SupabaseMap = {};

    airdrops.forEach((airdrop) => {
      pMap[airdrop.contract_id] = airdrop;
    });
    setSupabaseMap(pMap);
  }

  return (
    <>
      {isClient && (
        <LayoutAndNavbar>
          {!pChainAddr || parseInt(pChainAddr, 16) === 0 ? (
            <NotAuthorized />
          ) : (
            <div className="flex w-full flex-col items-center">
              <Image
                className="pt-11"
                src={'/claim-airdrop.svg'}
                alt="Claim Airdrop"
                width={574}
                height={103}
              />
              <div className="flex w-[500px] flex-col border-b border-b-primary-900 py-4 text-center">
                <span className="text-2xl font-bold tracking-[4px]">CLAIM AIRDROP REWARDS</span>
                <span className="text-primary-600">
                  These are the airdrops you are eligible to claim.
                </span>
              </div>
              <div className="grid grid-cols-1 justify-center gap-8 p-8 md:grid-cols-2">
                {hydratedAirdrops.map((item) => (
                  <AirdropCard key={item.id} cardInfo={item} />
                ))}
              </div>
            </div>
          )}
        </LayoutAndNavbar>
      )}
    </>
  );
}
