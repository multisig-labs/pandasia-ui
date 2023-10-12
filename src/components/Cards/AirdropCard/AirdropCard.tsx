import { CombinedAirdrop } from '@/types/pandasia';
import AirdropDesc from './AirdropDesc';
import AirdropFooter from './AirdropFooter';
import AirdropHeader from './AirdropHeader';

export type Props = {
  cardInfo: CombinedAirdrop;
};

export default function AirdropCard({ cardInfo }: Props) {
  // need to add in balance
  // need a startdate too
  const {
    id,
    contractId,
    owner,
    erc20,
    claimAmount,
    root,
    expiresAt,
    onlyRegistered,
    companyName,
    summary,
    description,
    url,
    logo,
  } = cardInfo;

  console.log({ cardInfo });

  return (
    <section className="flex min-h-[260px] max-w-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
      <AirdropHeader companyName={companyName} airdropDate={expiresAt * 1000} />
      <AirdropDesc claimAmt={claimAmount} />
      <AirdropFooter airdropDate={expiresAt * 1000} tokenAmt={BigInt(120)} />
    </section>
  );
}
