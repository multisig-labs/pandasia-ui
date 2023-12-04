import ClaimButton from '@/components/Button/ClaimButton';
import Logo from '@/components/Logo';
import { HexString } from '@/types/cryptoGenerics';
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  contractId: bigint;
  expiresAt: bigint;
  companyName: string;
  erc20Address: HexString;
  customRoot: HexString;
  logo: string;
  supabaseId: number;
  claimCount: number;
  setClaimCount?: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function AirdropHeader({
  contractId,
  expiresAt,
  companyName,
  erc20Address,
  customRoot,
  logo,
  supabaseId,
  claimCount,
  setClaimCount,
  setError,
}: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden h-12 w-12 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
          <Logo size={35} erc20Address={erc20Address} logo={logo} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{companyName.toUpperCase()}</span>
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">AIRDROP ENDS:&nbsp;</span>
            <span>{format(new Date(Number(expiresAt) * 1000), 'MM/dd/yyyy')}</span>
          </span>
        </div>
      </div>
      <ClaimButton
        claimCount={claimCount}
        setClaimCount={setClaimCount}
        customRoot={customRoot}
        contractId={contractId}
        supabaseId={supabaseId}
        setError={setError}
      />
    </div>
  );
}
