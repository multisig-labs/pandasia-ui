import Logo from '@/components/Logo';
import { HexString } from '@/types/cryptoGenerics';
import { format } from 'date-fns';

type Props = {
  expiresAt: bigint;
  companyName: string;
  erc20Address: HexString;
};
export default function AirdropHeader({ expiresAt, companyName, erc20Address }: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
          <Logo erc20Address={erc20Address} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{companyName.toUpperCase()}</span>
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">AIRDROP ENDS:&nbsp;</span>
            <span>{format(new Date(Number(expiresAt) * 1000), 'MM/dd/yyyy')}</span>
          </span>
        </div>
      </div>

      <div>
        <button className="border border-white px-4 py-2 text-xs font-semibold tracking-widest">
          CLAIM
        </button>
      </div>
    </div>
  );
}
