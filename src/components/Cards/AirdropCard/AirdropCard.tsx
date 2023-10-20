import { CombinedAirdrop } from '@/types/pandasia';
import AirdropDesc from './AirdropDesc';
import AirdropFooter from './AirdropFooter';
import AirdropHeader from './AirdropHeader';

export type Props = {
  cardInfo: CombinedAirdrop;
  claimCount: number;
};

export default function AirdropCard({ cardInfo, claimCount }: Props) {
  // need to add in balance
  // need a startdate too
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
    balance,
    companyName,
    summary,
    description,
    url,
    logo,
  } = cardInfo;

  return (
    <section className="flex min-h-[260px] max-w-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
      <AirdropHeader
        root={root}
        contractId={contractId}
        supabaseId={id}
        companyName={companyName}
        expiresAt={expiresAt}
        erc20Address={erc20}
        logo={logo}
        claimCount={claimCount}
      />
      <AirdropDesc claimAmt={claimAmount} />
      <AirdropFooter supabaseId={id} startsAt={startsAt} balance={balance} />
    </section>
  );
}
