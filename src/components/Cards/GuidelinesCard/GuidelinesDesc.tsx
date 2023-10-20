import { formatEther } from 'viem';

type Props = {
  claimAmt: bigint;
  tokenName: string | undefined;
};
export default function GuidelinesDesc({ claimAmt, tokenName }: Props) {
  return (
    <div className="flex h-32 w-full flex-col items-start justify-center border-b border-secondary-700 p-6">
      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-wider text-secondary-500">
          AIRDROPPED AMOUNT:
        </span>
        <span className="text-3xl tracking-[4px] text-primary-600">{formatEther(claimAmt)}</span>
        <span className="text-xs tracking-wider">{tokenName}</span>
      </div>
    </div>
  );
}
