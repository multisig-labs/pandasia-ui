import { useGetTokenBalance, useGetTokenSymbol } from '@/async_fns/wagmiHooks';
import ErrorBanner from '@/components/Errors/ErrorBanner';
import { HexString } from '@/types/cryptoGenerics';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

type Props = {
  claimAmt: bigint;
  error: string;
  erc20: HexString;
};
export default function AirdropDesc({ error, claimAmt, erc20 }: Props) {
  const { data: symbol } = useGetTokenSymbol(erc20);
  return (
    <div className="flex h-32 w-full flex-col items-start justify-center border-b border-secondary-700 p-6">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-secondary-500">
            AIRDROP AMOUNT:
          </span>
          <span className="text-3xl tracking-[4px] text-primary-600">
            {formatEther(claimAmt)} {symbol ? symbol.toLocaleUpperCase() : 'TOKENS'}
          </span>
        </div>
        <ErrorBanner error={error} />
      </div>
    </div>
  );
}
