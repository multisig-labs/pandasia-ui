import ErrorBanner from '@/components/Errors/ErrorBanner';
import { formatEther } from 'viem';

type Props = {
  claimAmt: bigint;
  error: string;
};
export default function AirdropDesc({ error, claimAmt }: Props) {
  return (
    <div className="flex h-32 w-full flex-col items-start justify-center border-b border-secondary-700 p-6">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-secondary-500">
            AIRDROP AMOUNT:
          </span>
          <span className="text-3xl tracking-[4px] text-primary-600">
            {formatEther(claimAmt)} GGP
          </span>
        </div>
        <ErrorBanner error={error} />
      </div>
    </div>
  );
}
