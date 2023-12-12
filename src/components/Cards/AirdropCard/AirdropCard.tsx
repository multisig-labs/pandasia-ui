import { CombinedAirdrop } from '@/types/pandasiaTypes';
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
    erc20,
    claimAmount,
    customRoot,
    startsAt,
    expiresAt,
    balance,
    companyName,
    logo,
  } = cardInfo;

  const [error, setError] = useState('');

  return (
    <section className="text-white flex min-h-[260px] max-w-[560px] flex-col rounded-2xl border border-secondary-700 bg-secondary-800 shadow-xl">
      <AirdropHeader
        customRoot={customRoot}
        contractId={contractId}
        supabaseId={id}
        companyName={companyName}
        expiresAt={expiresAt}
        erc20Address={erc20}
        logo={logo}
        claimCount={claimCount}
        setClaimCount={setClaimCount}
        setError={setError}
      />
      <AirdropDesc erc20={erc20} error={error} claimAmt={claimAmount} />
      <AirdropFooter
        supabaseId={id}
        startsAt={startsAt}
        balance={balance}
        showGuidelines={showGuidelines}
      />
    </section>
  );
}
