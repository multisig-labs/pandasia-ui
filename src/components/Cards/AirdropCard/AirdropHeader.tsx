import ClaimButton from '@/components/Button/ClaimButton';
import Logo from '@/components/Logo';
import { HexString } from '@/types/cryptoGenerics';
import { format } from 'date-fns';

type Props = {
  contractId: bigint;
  expiresAt: bigint;
  companyName: string;
  erc20Address: HexString;
  root: HexString;
  logo: string;
  supabaseId: number;
  claimCount: number;
};

export default function AirdropHeader({
  contractId,
  expiresAt,
  companyName,
  erc20Address,
  root,
  logo,
  supabaseId,
  claimCount,
}: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden h-12 w-12 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
          <Logo size={40} erc20Address={erc20Address} logo={logo} />
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
        root={root}
        contractId={contractId}
        supabaseId={supabaseId}
      />
    </div>
  );
}
