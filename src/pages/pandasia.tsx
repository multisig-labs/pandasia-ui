import { useGetAirdrops } from '@/async_fns/wagmi';
import AirdropCard from '@/components/Cards/AirdropCard/AirdropCard';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { supabase } from '@/config/supabase';
import { HydratedAirdrop, SupabaseAirdrop } from '@/types/pandasia';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SupabaseMap {
  [id: number]: SupabaseAirdrop;
}

export default function Pandasia() {
  const [hydratedAirdrops, setHydratedAirdrops] = useState<HydratedAirdrop[]>([]);
  const [supabaseMap, setSupabaseMap] = useState<SupabaseMap>({});

  // Get contract data data
  const {
    data: contractAirdrops,
    isLoading: contractAirdropsIsLoading,
    isError: contractAirdropsIsError,
    error: contractAirdropsError,
  } = useGetAirdrops(BigInt(0), BigInt(0));

  // Get supabase data
  useEffect(() => {
    getAirdrops();
  }, []);

  // Combine contract and supabase airdrops to one hydrated airdrop
  useEffect(() => {
    if (Object.keys(supabaseMap).length == 0) {
      return;
    }
    if (!contractAirdrops || contractAirdrops.length == 0) {
      return;
    }

    let tempHydrated: HydratedAirdrop[] = [];

    contractAirdrops.forEach((airdrop) => {
      const hydratedAirdrop: HydratedAirdrop = {
        id: supabaseMap[Number(airdrop.id)].supabaseId,
        contractId: airdrop.id,
        owner: airdrop.owner,
        erc20: airdrop.erc20,
        claimAmount: airdrop.claimAmount,
        root: airdrop.root,
        expiresAt: airdrop.expires,
        onlyRegistered: airdrop.onlyRegistered,
        companyName: supabaseMap[Number(airdrop.id)].companyName,
        summary: supabaseMap[Number(airdrop.id)].summary,
        description: supabaseMap[Number(airdrop.id)].description,
        url: supabaseMap[Number(airdrop.id)].url,
        logo: supabaseMap[Number(airdrop.id)].logo,
      };

      tempHydrated.push(hydratedAirdrop);
    });

    setHydratedAirdrops(tempHydrated);
  }, [supabaseMap, contractAirdrops]);

  if (contractAirdropsIsLoading) {
    return <div>Loading!</div>;
  }

  if (contractAirdropsIsError) {
    console.log(contractAirdropsError);
    return <div>Error!</div>;
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

    if (query.data == null) {
      return;
    }

    const airdrops = query.data;
    let pMap: SupabaseMap = {};

    airdrops.forEach((airdrop) => {
      const sbAd: SupabaseAirdrop = {
        supabaseId: airdrop.id,
        companyName: airdrop.airdrop_info.company_name,
        summary: airdrop.airdrop_info.summary,
        logo: airdrop.airdrop_info.logo,
        description: airdrop.airdrop_info.description,
        url: airdrop.airdrop_info.url,
      };
      pMap[airdrop.contract_id] = sbAd;
    });
    setSupabaseMap(pMap);
  }

  console.log('HYDRARETD AIRDROPS FINALLY', hydratedAirdrops);

  return (
    <LayoutAndNavbar>
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
    </LayoutAndNavbar>
  );
}
