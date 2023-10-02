import { getTreeData } from '@/async_fns/pandasia';
import { newAirdrop } from '@/async_fns/viem';
import { publicClient, walletClient } from '@/config/viem';
import { HexString } from '@/types/cryptoGenerics';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function CreateAirdrop() {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [summary, setSummary] = useState('');
  const [logo, setLogo] = useState('');
  const [onlyRegistered, setOnlyRegistered] = useState(false);
  const [claimAmount, setClaimAmount] = useState<bigint>(BigInt(0));
  const [expiresAt, setExpiresAt] = useState(0);
  const [erc20, setErc20] = useState<HexString>('0x0');

  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);
  if (treesLoading) {
    return null;
  }

  if (trees === undefined) {
    return <span>Error retreiving trees</span>;
  }

  const createAirdrop = async () => {
    // make sure we're connected to
    //      supabase
    //      contracts
    //      go backend

    // get all user input

    // from Go code
    //    get current merkle root

    // send to the contracts
    //    c_id = owner, root, onlyRegistered, erc20, claimAmount, expiresAt, startsAt
    // send to supabase
    //    s_id = logo, companyName, description, website, summary
    //    s_id => c_id

    const treeData = await getTreeData();
    const merkleRoot = treeData[0].Root;
    console.log('merkel root', merkleRoot);

    //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
    const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const ad = await newAirdrop(
      address,
      merkleRoot as HexString,
      onlyRegistered,
      erc20,
      claimAmount,
      expiresAt,
    );
    console.log('ad', ad);
    console.log('about to write');
    const txnHash = await walletClient.writeContract(ad);
    console.log('written');
    console.log('txnHash', txnHash);
    const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
    console.log('txn', txn);
  };

  return (
    <main className="flex-col">
      <div>Create airdrop page now bitches</div>

      <div className="flex-col">
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value.trim())}
          className="text-black"
          placeholder="Company Name"
        />
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value.trim())}
          className="text-black"
          placeholder="Summary"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value.trim())}
          className="text-black"
          placeholder="Description"
        />
        <input
          value={logo}
          onChange={(e) => setLogo(e.target.value.trim())}
          className="text-black"
          placeholder="Logo"
        />
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
          onChange={(e) => setClaimAmount(BigInt(e.target.value.trim()))}
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
    </main>
  );
}
