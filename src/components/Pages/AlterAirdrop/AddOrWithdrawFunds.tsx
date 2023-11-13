import { fundAirdrop, increaseAllowance, withdrawFunds } from '@/async_fns/viemAsync';
import { useGetTokenBalance } from '@/async_fns/wagmiHooks';
import { publicClient, walletClient } from '@/config/viemConfig';
import { HexString } from '@/types/cryptoGenerics';
import { CombinedAirdrop } from '@/types/pandasiaTypes';
import { useState } from 'react';
import { BaseError, TransactionReceipt } from 'viem';
import { useAccount } from 'wagmi';

type Props = {
  combinedAirdrops: CombinedAirdrop[];
};

export default function AddOrWithdrawFunds({ combinedAirdrops }: Props) {
  const [contractId, setContractId] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [addAmt, setAddAmt] = useState('');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);
  const [viemError, setViemError] = useState<BaseError | null>(null);
  const { address: account } = useAccount();

  const withdraw = async () => {
    try {
      const preparedWithdraw = await withdrawFunds(
        BigInt(contractId),
        BigInt(withdrawAmt),
        account as HexString,
      );
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
      const preparedFund = await fundAirdrop(
        BigInt(contractId),
        BigInt(addAmt),
        account as HexString,
      );
      const txnHash = await walletClient.writeContract(preparedFund);
      console.log({ walletClient });
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

  const increase = async () => {
    try {
      let foundAirdrop = combinedAirdrops.find((obj) => obj.contractId === BigInt(contractId));
      console.log({ foundObj: foundAirdrop });
      if (foundAirdrop) {
        const preparedIncrease = await increaseAllowance(
          foundAirdrop.erc20,
          BigInt(addAmt),
          account as HexString,
        );
        const txnHash = await walletClient.writeContract(preparedIncrease);
        const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
        setTransaction(txn);
        setViemError(null);
      }
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
        value={contractId}
        onChange={(e) => setContractId(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Airdrop Id"
      />
      <label>Amount to Add/Withdraw/Increase</label>
      <input
        value={addAmt}
        onChange={(e) => setAddAmt(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Add Amount"
      />
      <div className="flex w-full justify-between">
        <button className="border my-4 w-60 p-4 bg-blue-900" onClick={add}>
          Add Funds
        </button>
        <button className="border my-4 w-60 p-4 bg-blue-900" onClick={increase}>
          Increase Allowance
        </button>
      </div>
      <div className="flex w-full justify-between">
        <button className="border my-4 w-60 p-4 bg-orange-900" onClick={withdraw}>
          Withdraw Funds
        </button>
      </div>
      {viemError && <div className="text-orange-500">{viemError.message}</div>}
    </div>
  );
}
