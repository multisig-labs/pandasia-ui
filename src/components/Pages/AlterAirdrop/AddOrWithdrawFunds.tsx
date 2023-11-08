import { fundAirdrop, withdrawFunds } from '@/async_fns/viemAsync';
import { publicClient, walletClient } from '@/config/viemConfig';
import { CombinedAirdrop } from '@/types/pandasiaTypes';
import { useEffect, useState } from 'react';
import { BaseError, TransactionReceipt } from 'viem';

type Props = {
  combinedAirdrops: CombinedAirdrop[];
};

export default function AddOrWithdrawFunds({ combinedAirdrops }: Props) {
  const [airdropId, setAirdropId] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [addAmt, setAddAmt] = useState('');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);
  const [viemError, setViemError] = useState<BaseError | null>(null);

  const withdraw = async () => {
    try {
      const preparedWithdraw = await withdrawFunds(BigInt(airdropId), BigInt(withdrawAmt));
      const txnHash = await walletClient.writeContract(preparedWithdraw);
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);
      setViemError(null);
    } catch (err) {
      if (err instanceof BaseError) {
        console.warn(err);
        setViemError(err);
      }
    }
  };

  const add = async () => {
    try {
      const preparedFund = await fundAirdrop(BigInt(airdropId), BigInt(addAmt));
      const txnHash = await walletClient.writeContract(preparedFund);
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);
      setViemError(null);
    } catch (err) {
      if (err instanceof BaseError) {
        console.warn(err);
        setViemError(err);
      }
    }
  };

  return (
    <div className="flex w-[580px] text-secondary-400 flex-col py-4 text-left">
      <span className="text-2xl font-bold tracking-[4px]">ADD OR WITHDRAW FUNDS</span>
      <table className="border my-4 bg-secondary-800">
        <thead className="border">
          <tr>
            <th className="pl-2 border">Contract Id</th>
            <th className="pl-2 border">Company Name</th>
            <th className="pl-2 border">Amount Remaining</th>
            <th className="pl-2 border">AsEth</th>
          </tr>
        </thead>
        <tbody>
          {combinedAirdrops.map((airdrop) => {
            return (
              <tr className="border" key={airdrop.id}>
                <td className="pl-2 border">{Number(airdrop.contractId)}</td>
                <td className="pl-2 border">{airdrop.companyName}</td>
                <td className="pl-2 border">{Number(airdrop.balance)}</td>
                <td className="pl-2 border">
                  {Number(airdrop.balance / 1_000_000_000_000_000_000n)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label>Airdrop Id</label>
      <input
        value={airdropId}
        onChange={(e) => setAirdropId(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Airdrop Id"
      />
      <label>Add Amount</label>
      <input
        value={addAmt}
        onChange={(e) => setAddAmt(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Add Amount"
      />
      <label>Withdraw Amount</label>
      <input
        value={withdrawAmt}
        onChange={(e) => setWithdrawAmt(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Withdraw Amount"
      />
      <div className="flex w-full justify-between">
        <button className="border my-4 w-60 p-4 bg-blue-900" onClick={add}>
          Add Funds
        </button>
        <button className="border my-4 w-60 p-4 bg-orange-900" onClick={withdraw}>
          Withdraw Funds
        </button>
      </div>
      {viemError && <div className="text-orange-500">{viemError.message}</div>}
    </div>
  );
}
