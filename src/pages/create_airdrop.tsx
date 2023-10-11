import { getTreeData } from '@/async_fns/pandasia';
import { getAirdropIds, newAirdrop } from '@/async_fns/viem';
import { useGetAirdropIds } from '@/async_fns/wagmi';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { returnErrString } from '@/config/axios';
import { publicClient, walletClient } from '@/config/viem';
import { HexString } from '@/types/cryptoGenerics';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionReceipt } from 'viem';
import { useAccount } from 'wagmi';

export default function CreateAirdrop() {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [summary, setSummary] = useState('');
  const [logo, setLogo] = useState('');
  const [url, setUrl] = useState('');
  const [onlyRegistered, setOnlyRegistered] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [expiresAt, setExpiresAt] = useState(0);
  const [erc20, setErc20] = useState<HexString>('0x0');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);
  const supabaseClient = useSupabaseClient();
  const [sb, setSb] = useState();

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
    return <span>Error retreiving trees or airdrops</span>;
  }

  const createAirdrop = async () => {
    try {
      const treeData = await getTreeData();
      const merkleRoot = treeData[0].Root;

      const preparedAirdropCall = await newAirdrop(
        account,
        merkleRoot as HexString,
        onlyRegistered,
        erc20,
        BigInt(claimAmount),
        expiresAt,
      );

      const txnHash = await walletClient.writeContract(preparedAirdropCall);
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);

      const adIds = await getAirdropIds(account);
      const contractId = adIds[adIds.length - 1];

      const { data: airdropExistsMaybe, error: airdropExistsError } = await supabaseClient
        .from('airdrop_to_contract')
        .select(`id, contract_id`)
        .eq(`contract_id`, contractId);

      if (airdropExistsError) {
        throw 'error checking for airdrop';
      }

      if (airdropExistsMaybe.length != 0) {
        // we don't watnt to create airdrop info or the other thing right?
        throw 'Supabase contract_id already exists. Not creating supabase info';
      }

      const { data: airdropInfo, error: airdropInfoError } = await supabaseClient
        .from('airdrop_info')
        .insert({
          company_name: companyName,
          summary,
          description,
          url,
          logo,
        })
        .select();

      if (!airdropInfo) {
        throw 'unable to make airdorp info';
      }

      const { data: airdropToContractData, error: airdropToContractError } = await supabaseClient
        .from('airdrop_to_contract')
        .insert({ id: airdropInfo[0].id, contract_id: Number(contractId.toString()) })
        .select();

      setSb(airdropInfo[0].id);
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
      <div className="flex flex-col text-center">
        <div className="flex flex-col w-[500px] flex-col border-b border-b-primary-900 py-4 text-center">
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-black"
            placeholder="Url"
          />
          <input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="text-black"
            placeholder="Logo"
          />
          {/* make this a radio button, or toggle switch thing */}
          <input
            //@ts-ignore
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

        <button className="border p-10 m-10 bg-slate-700" onClick={createAirdrop}>
          Create Airdrop
        </button>

        {transaction ? (
          <div>Airdrop contract created {`${transaction.transactionHash}`}</div>
        ) : (
          <div>Not yet sent to contract</div>
        )}
        {sb ? <div>Supabased! {`${sb}`}</div> : <div>Not yet created in supabase</div>}
      </div>
    </LayoutAndNavbar>
  );
}
