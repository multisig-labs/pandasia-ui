import { formatEther } from 'viem';

type Props = {
  claimAmt: bigint;
};
export default function AirdropDesc({ claimAmt }: Props) {
  return (
    <div className="flex h-32 w-full flex-col items-start justify-center border-b border-secondary-700 p-6">
      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-wider text-secondary-500">
          AIRDROP AMOUNT:
        </span>
        <span className="text-3xl tracking-[4px] text-primary-600">
          {formatEther(claimAmt)} GGP
        </span>
      </div>
    </div>
  );
}
