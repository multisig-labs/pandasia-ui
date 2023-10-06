import { getTreeData } from '@/async_fns/pandasia';
import { newAirdrop } from '@/async_fns/viem';
import { useGetAirdropIds, useGetAirdrops } from '@/async_fns/wagmi';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { returnErrString } from '@/config/axios';
import { supabase } from '@/config/supabase';
import { publicClient, walletClient } from '@/config/viem';
import { HexString } from '@/types/cryptoGenerics';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionReceipt } from 'viem';
import { useAccount } from 'wagmi';

export default function CreateAirdrop() {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [summary, setSummary] = useState('');
  const [logo, setLogo] = useState('');
  const [onlyRegistered, setOnlyRegistered] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [expiresAt, setExpiresAt] = useState(0);
  const [erc20, setErc20] = useState<HexString>('0x0');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*');
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  const { address: account } = useAccount();

  const { data: airdropIds, isLoading: airdropIdsIsLoading } = useGetAirdropIds(account || '0x0');
  const { isLoading: airdropsIsLoading, data: airdrops } = useGetAirdrops(BigInt(0), BigInt(100));

  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);

  if (treesLoading || airdropsIsLoading || airdropIdsIsLoading) {
    return null;
  }

  if (
    trees === undefined ||
    airdrops === undefined ||
    airdropIds === undefined ||
    account === undefined
  ) {
    return <span>Error retreiving trees or airdrops</span>;
  }

  const ownerAirdrops = airdrops.filter((airdrop) => {
    return airdrop.owner == account;
  });

  console.log('owner airdrops', ownerAirdrops);

  const messinAround = async () => {
    const { data, error } = await supabase.from('airdrop_to_contract').select();
    console.log('data', data);
    console.log('error', error);

    const { data: ddata, error: derror } = await supabase
      .from('airdrop_to_contract')
      .insert({ contract_id: 10 });
    console.log('ddata', ddata);
    console.log('ddata', derror);
  };

  const createAirdrop = async () => {
    try {
      // make sure we're connected to
      //      supabase
      //      contracts
      //      go backend

      // get all user input

      // from Go code
      //    get current merkle root

      // send to the contracts
      //    c_id = owner, root, onlyRegistered, erc20, claimAmount, expiresAt, startsAt

      // get from the contracts the newest created airdrop from this owner

      // send to supabase
      //    s_id = logo, companyName, description, website, summary
      //    s_id => c_id

      const treeData = await getTreeData();
      const merkleRoot = treeData[0].Root;

      const ad = await newAirdrop(
        account,
        merkleRoot as HexString,
        onlyRegistered,
        erc20,
        BigInt(claimAmount),
        expiresAt,
      );

      const txnHash = await walletClient.writeContract(ad);
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);

      // now I want to make the connection to supabase
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = returnErrString(err);
        console.warn(err);
      } else {
        console.warn(err);
      }
    }
  };

  return (
    <LayoutAndNavbar>
      {user ? (
        <>
          <div className="flex w-[500px] flex-col border-b border-b-primary-900 py-4 text-center">
            <span className="text-2xl font-bold tracking-[4px]">CREATE AIRDROP</span>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-black"
              placeholder="Company Name"
            />
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="text-black"
              placeholder="Summary"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-black"
              placeholder="Description"
            />
            <input
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="text-black"
              placeholder="Logo"
            />
            {/* make this a radio button, or toggle switch thing */}
            <input
              value={onlyRegistered}
              onChange={(e) => (e.target.value === '' ? setOnlyRegistered(false) : true)}
              className="text-black"
              placeholder="onlyRegistered"
            />
            <input
              value={erc20}
              onChange={(e) => setErc20(e.target.value.trim() as HexString)}
              className="text-black"
              placeholder="erc20 address"
            />
            <input
              onChange={(e) => setClaimAmount(e.target.value.trim())}
              className="text-black"
              placeholder="claim amount"
            />
            <div>{claimAmount.toLocaleString()}</div>
            <input
              type="date"
              onChange={(e) => {
                const test = new Date(e.target.value);
                console.log(test.getTime());
                setExpiresAt(test.getTime() / 1000);
              }}
              className="text-black"
              placeholder="claim amount"
            />
            <div>{expiresAt}</div>

            <button onClick={() => setOnlyRegistered(!onlyRegistered)}>setonlyresgieres</button>
          </div>

          <button onClick={createAirdrop}>Create Airdrop</button>
          {transaction ? <div>Success!</div> : <div>Not created</div>}
          <button className="py-10" onClick={messinAround}>
            Messing around
          </button>
        </>
      ) : (
        <Link href={'/login'}>Log in to supabase</Link>
      )}
    </LayoutAndNavbar>
  );
}
