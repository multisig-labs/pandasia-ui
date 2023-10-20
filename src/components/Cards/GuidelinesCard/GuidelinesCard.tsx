import { useGetTokenName } from '@/async_fns/wagmi';
import { CombinedAirdrop } from '@/types/pandasia';
import { Dispatch, SetStateAction } from 'react';
import GuidelinesDesc from './GuidelinesDesc';
import GuidelinesFooter from './GuidelinesFooter';
import GuidelinesHeader from './GuidelinesHeader';

export type Props = {
  cardInfo: CombinedAirdrop;
  claimCount: number;
  setClaimCount: Dispatch<SetStateAction<number>>;
};

export default function GuidelinesCard({ cardInfo, claimCount, setClaimCount }: Props) {
  const { data: tokenName } = useGetTokenName(cardInfo.erc20);
  // getBalance and getStartDate
  const { id, contractId, claimAmount, root, startsAt, expiresAt } = cardInfo;
  return (
    <div className="flex w-full justify-end">
      <section className="flex min-h-[260px] basis-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
        <GuidelinesHeader
          contractId={contractId}
          root={root}
          expiresAt={expiresAt}
          supabaseId={id}
          claimCount={claimCount}
          setClaimCount={setClaimCount}
        />
        <GuidelinesDesc claimAmt={claimAmount} tokenName={tokenName} />
        <GuidelinesFooter startsAt={Number(startsAt) * 1000} tokenAmt={BigInt(12121)} />
      </section>
    </div>
  );
}
