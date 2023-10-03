import AirdropDesc from './AirdropDesc';
import AirdropFooter from './AirdropFooter';
import AirdropHeader from './AirdropHeader';

export type Props = {
  cardContractInfo: CardContractInfo;
  cardSupabaseInfo: CardSupabaseInfo;
};

export type CardContractInfo = {
  expiresAt: number;
  claimAmt: bigint;
  tokenAmt: bigint;
};

export type CardSupabaseInfo = {
  logo: string;
  companyName: string;
  airdropDate: number;
};

export default function AirdropCard({ cardContractInfo, cardSupabaseInfo }: Props) {
  const { expiresAt, claimAmt, tokenAmt } = cardContractInfo;
  const { logo, companyName, airdropDate } = cardSupabaseInfo;
  return (
    <section className="flex min-h-[260px] max-w-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
      <AirdropHeader companyName={companyName} airdropDate={airdropDate} />
      <AirdropDesc claimAmt={claimAmt} />
      <AirdropFooter airdropDate={airdropDate} tokenAmt={tokenAmt} />
    </section>
  );
}
