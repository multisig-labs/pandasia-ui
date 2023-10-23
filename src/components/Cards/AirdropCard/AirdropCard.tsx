import { CombinedAirdrop } from '@/types/pandasia';
import { Dispatch, SetStateAction, useState } from 'react';
import AirdropDesc from './AirdropDesc';
import AirdropFooter from './AirdropFooter';
import AirdropHeader from './AirdropHeader';

export type Props = {
  cardInfo: CombinedAirdrop;
  claimCount: number;
  setClaimCount?: Dispatch<SetStateAction<number>>;
  showGuidelines: boolean;
};

export type Errors = {};

export default function AirdropCard({
  cardInfo,
  claimCount,
  setClaimCount,
  showGuidelines,
}: Props) {
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

  const [error, setError] = useState('');

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
        setClaimCount={setClaimCount}
      />
      <AirdropDesc error={error} claimAmt={claimAmount} />
      <AirdropFooter
        supabaseId={id}
        startsAt={startsAt}
        balance={balance}
        showGuidelines={showGuidelines}
      />
    </section>
  );
}
