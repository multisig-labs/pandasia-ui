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
  // getBalance and getStartDate
  const {
    id,
    contractId,
    owner,
    erc20,
    claimAmount,
    root,
    startsAt,
    expiresAt,
    onlyRegistered,
    companyName,
    summary,
    description,
    url,
    logo,
  } = cardInfo;
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
        <GuidelinesDesc claimAmt={claimAmount} tokenName={'test'} />
        <GuidelinesFooter startsAt={Number(startsAt) * 1000} tokenAmt={BigInt(12121)} />
      </section>
    </div>
  );
}
