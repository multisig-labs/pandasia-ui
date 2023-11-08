import { getTreeData } from '@/async_fns/backendCalls';
import { useGetAirdropIds, useGetAirdrops } from '@/async_fns/wagmiHooks';
import CreateAirdrop from '@/components/Pages/AlterAirdrop/CreateAirdrop';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { SupabaseMap } from './airdrops';
import { CombinedAirdrop } from '@/types/pandasiaTypes';
import { supabase } from '@/config/supabaseConfig';
import AddOrWithdrawFunds from '@/components/Pages/AlterAirdrop/AddOrWithdrawFunds';

export default function AlterAirdrop() {
  const supabaseClient = useSupabaseClient();
  const [sb, setSb] = useState('');
  const [supabaseMap, setSupabaseMap] = useState<SupabaseMap>({});
  const [combinedAirdrops, setCombinedAirdrops] = useState<CombinedAirdrop[]>([]);

  const user = useUser();

  const { address: account } = useAccount();

  const { data: airdropIds, isLoading: airdropIdsIsLoading } = useGetAirdropIds(account || '0x0');
  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);

  const { data: contractAirdrops } = useGetAirdrops(BigInt(0), BigInt(0));

  // Get supabase data
  useEffect(() => {
    getAirdrops();
  }, []);

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
        startsAt: contractAirdrop.startsAt,
        expiresAt: contractAirdrop.expiresAt,
        onlyRegistered: contractAirdrop.onlyRegistered,
        balance: contractAirdrop.balance,
        companyName: supabaseMap[Number(contractAirdrop.id)].company_name,
        summary: supabaseMap[Number(contractAirdrop.id)].summary,
        description: supabaseMap[Number(contractAirdrop.id)].description,
        url: supabaseMap[Number(contractAirdrop.id)].url,
        logo: supabaseMap[Number(contractAirdrop.id)].logo,
        claimCount: supabaseMap[Number(contractAirdrop.id)].claim_count.claims,
      };

      tempHydrated.push(hydratedAirdrop);
    });

    setCombinedAirdrops(tempHydrated);
  }, [supabaseMap, contractAirdrops]);

  if (!user) {
    return <Link href={'/login'}>Log in to supabase</Link>;
  }
  if (treesLoading || airdropIdsIsLoading) {
    return null;
  }

  // Get contract data data
  async function getAirdrops() {
    const query = await supabase.from('airdrop_info').select(
      `
        *,
        claim_count(
          claims
        ),
        airdrop_to_contract(
          contract_id
        )
    `,
    );
    if (query.error) {
      console.warn('Error fetching data from supabase', query.error);
      return;
    }

    if (query.data == null) {
      console.warn('No data returned from supabase');
      return;
    }

    //@ts-ignore supabase thinks airdrop_info is an array but it's just an object
    const airdrops: SupabaseReturnType[] = query.data;

    let pMap: SupabaseMap = {};

    console.log(airdrops);
    airdrops.forEach((airdrop) => {
      pMap[airdrop.airdrop_to_contract.contract_id] = airdrop;
    });
    setSupabaseMap(pMap);
  }

  if (trees === undefined || airdropIds === undefined || account === undefined) {
    return (
      <LayoutAndNavbar>
        <span>Error retreiving trees or airdrops, perhaps your wallet is not connected.</span>
      </LayoutAndNavbar>
    );
  }

  return (
    <LayoutAndNavbar>
      <div className="flex gap-4 justify-between w-full text-center">
        <CreateAirdrop account={account} supabaseClient={supabaseClient} sb={sb} setSb={setSb} />
        <AddOrWithdrawFunds combinedAirdrops={combinedAirdrops} />
      </div>
    </LayoutAndNavbar>
  );
}
