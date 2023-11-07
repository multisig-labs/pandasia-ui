import { getTreeData } from '@/async_fns/backendCalls';
import { useGetAirdropIds } from '@/async_fns/wagmiHooks';
import CreateAirdrop from '@/components/Pages/AlterAirdrop/CreateAirdrop';
import WithdrawFunds from '@/components/Pages/AlterAirdrop/WithdrawFunds';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export default function AlterAirdrop() {
  const supabaseClient = useSupabaseClient();
  const [sb, setSb] = useState('');

  const user = useUser();

  const { address: account } = useAccount();

  const { data: airdropIds, isLoading: airdropIdsIsLoading } = useGetAirdropIds(account || '0x0');
  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);

  if (!user) {
    return <Link href={'/login'}>Log in to supabase</Link>;
  }
  if (treesLoading || airdropIdsIsLoading) {
    return null;
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
      <div className="flex justify-between w-full text-center">
        <CreateAirdrop account={account} supabaseClient={supabaseClient} sb={sb} setSb={setSb} />
        <WithdrawFunds />
      </div>
    </LayoutAndNavbar>
  );
}
