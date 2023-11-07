import { withdrawFunds } from '@/async_fns/viemAsync';
import { CombinedAirdrop } from '@/types/pandasiaTypes';
import { useState } from 'react';

type Props = {
  combinedAirdrops: CombinedAirdrop[];
};

export default function WithdrawFunds({ combinedAirdrops }: Props) {
  const [airdropId, setAirdropId] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');

  const withdraw = async () => {
    const preparedWithdraw = await withdrawFunds(BigInt(airdropId), BigInt(withdrawAmt));
    console.log(preparedWithdraw);
  };

  return (
    <div className="flex w-[580px] text-secondary-400 flex-col py-4 text-left">
      <span className="text-2xl font-bold tracking-[4px]">WITHDRAW FUNDS</span>
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
      <label>Withdraw Amount</label>
      <input
        value={withdrawAmt}
        onChange={(e) => setWithdrawAmt(e.target.value)}
        className="p-2 bg-secondary-700 text-white"
        placeholder="Withdraw Amount"
      />
      <button className="border my-4 w-60 p-4 bg-orange-900" onClick={withdraw}>
        Withdraw Funds
      </button>
    </div>
  );
}
