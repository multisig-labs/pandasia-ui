import { CombinedAirdrop } from '@/types/pandasia';
import GuidelinesDesc from './GuidelinesDesc';
import GuidelinesFooter from './GuidelinesFooter';
import GuidelinesHeader from './GuidelinesHeader';

export type Props = {
  cardInfo: CombinedAirdrop;
};

export default function GuidelinesCard({ cardInfo }: Props) {
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
        <GuidelinesHeader expiresAt={expiresAt} />
        <GuidelinesDesc claimAmt={claimAmount} />
        <GuidelinesFooter startsAt={Number(startsAt) * 1000} tokenAmt={BigInt(12121)} />
      </section>
    </div>
  );
}
