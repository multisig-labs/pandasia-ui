import ClaimButton from '@/components/Button/ClaimButton';
import { HexString } from '@/types/cryptoGenerics';
import { format } from 'date-fns';

type Props = {
  expiresAt: bigint;
  contractId: bigint;
  root: HexString;
};
export default function GuidelinesHeader({ expiresAt, root, contractId }: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">AIRDROP ENDS:&nbsp;</span>
            <span>{format(new Date(Number(expiresAt) * 1000), 'MM/dd/yyyy')}</span>
          </span>
        </div>
      </div>

      <ClaimButton root={root} contractId={contractId} />
    </div>
  );
}
