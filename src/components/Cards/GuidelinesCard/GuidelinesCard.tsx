import { CardContractInfo, CardSupabaseInfo } from '../AirdropCard/AirdropCard';
import GuidelinesDesc from './GuidelinesDesc';
import GuidelinesFooter from './GuidelinesFooter';
import GuidelinesHeader from './GuidelinesHeader';

export type Props = {
  cardContractInfo: CardContractInfo;
  cardSupabaseInfo: CardSupabaseInfo;
};

export default function GuidelinesCard({ cardContractInfo, cardSupabaseInfo }: Props) {
  const { expiresAt, claimAmt, tokenAmt } = cardContractInfo;
  const { airdropDate } = cardSupabaseInfo;
  return (
    <div className="flex w-full justify-end">
      <section className="flex min-h-[260px] basis-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
        <GuidelinesHeader expiresAt={expiresAt} />
        <GuidelinesDesc claimAmt={claimAmt} />
        <GuidelinesFooter airdropDate={airdropDate} tokenAmt={tokenAmt} />
      </section>
    </div>
  );
}
