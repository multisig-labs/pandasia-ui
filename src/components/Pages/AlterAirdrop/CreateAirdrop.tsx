import { getTreeData } from '@/async_fns/backendCalls';
import { getAirdropIds, newAirdrop } from '@/async_fns/viemAsync';
import { publicClient, walletClient } from '@/config/viemConfig';
import { HexString } from '@/types/cryptoGenerics';
import { SupabaseClient } from '@supabase/auth-helpers-react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { BaseError, TransactionReceipt, parseEther } from 'viem';

type Props = {
  account: HexString;
  supabaseClient: SupabaseClient;
  sb: string;
  setSb: (h: string) => void;
};

export default function CreateAirdrop({ account, supabaseClient, sb, setSb }: Props) {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [summary, setSummary] = useState('');
  const [logo, setLogo] = useState('');
  const [url, setUrl] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [startsAt, setStartsAt] = useState(0);
  const [expiresAt, setExpiresAt] = useState(0);
  const [erc20, setErc20] = useState<HexString>('0x0');
  const [customMerkleRoot, setCustomMerkleRoot] = useState<HexString>(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  );
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);
  const [viemError, setViemError] = useState<BaseError | null>(null);
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const createAirdrop = async () => {
    try {
      const treeData = await getTreeData();

      const preparedAirdropCall = await newAirdrop(
        account,
        customMerkleRoot,
        erc20 as HexString,
        parseEther(claimAmount),
        BigInt(startsAt),
        BigInt(expiresAt),
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

      const { data: airdropInfo } = await supabaseClient
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
        throw 'unable to make airdrop info';
      }

      const { data: airdropToContractData } = await supabaseClient
        .from('airdrop_to_contract')
        .insert({ id: airdropInfo[0].id, contract_id: Number(contractId.toString()) })
        .select();

      const { data: claimCountData } = await supabaseClient
        .from('claim_count')
        .insert({ id: airdropInfo[0].id, claims: 0 })
        .select();

      setSb(airdropInfo[0].id);
      setAxiosError(null);
      setViemError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.warn(err);
        setAxiosError(err);
      }
      if (err instanceof BaseError) {
        console.warn(err);
        setViemError(err);
      }
    }
  };

  return (
    <div className="flex w-[500px] flex-col border-b border-b-primary-900 py-4 text-secondary-400 text-left">
      <span className="text-2xl font-bold tracking-[4px]">CREATE AIRDROP</span>
      <label>Company Name</label>
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Company Name"
      />
      <label>Summary</label>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Summary"
      />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Description"
      />
      <label>Url</label>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Url"
      />
      <label>Logo URL</label>
      <input
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Logo"
      />
      <label>Erc20 Address</label>
      <input
        value={erc20}
        onChange={(e) => setErc20(e.target.value.trim() as HexString)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="erc20 address"
      />
      <label>Claim Amount (in Ether)</label>
      <input
        onChange={(e) => setClaimAmount(e.target.value.trim())}
        className="p-2 bg-secondary-700 text-white"
        placeholder="claim amount"
      />
      <label>Custom Merkle Root</label>
      <input
        value={customMerkleRoot}
        onChange={(e) => setCustomMerkleRoot(e.target.value.trim() as HexString)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="custom merkle root?"
      />
      <label>Starts At</label>
      <input
        type="datetime-local"
        onChange={(e) => {
          const test = new Date(e.target.value);
          setStartsAt(test.getTime() / 1000);
        }}
        className="p-2 bg-secondary-700 text-white"
        placeholder="starts at"
      />
      <label>Expires At</label>
      <input
        type="datetime-local"
        onChange={(e) => {
          const test = new Date(e.target.value);
          setExpiresAt(test.getTime() / 1000);
        }}
        className="p-2 bg-secondary-700 text-white"
        placeholder="expires at"
      />
      <button className="border p-4 w-60 my-4 bg-green-900" onClick={createAirdrop}>
        Create Airdrop
      </button>
      {transaction ? (
        <div>Airdrop contract created {`${transaction.transactionHash}`}</div>
      ) : (
        <div>Not yet sent to contract</div>
      )}
      {sb ? <div>Supabased! {`${sb}`}</div> : <div>Not yet created in supabase</div>}
      {axiosError && <div className="text-purple-500">{axiosError.message}</div>}
      {viemError && <div className="text-orange-500">{viemError.message}</div>}
    </div>
  );
}
