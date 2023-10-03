import { format } from 'date-fns';
import { FaBitcoin } from 'react-icons/fa6';

type Props = {
  airdropDate: number;
  companyName: string;
};
export default function AirdropHeader({ airdropDate, companyName }: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
          <FaBitcoin size={27} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{companyName.toUpperCase()}</span>
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">TIME LEFT TO CLAIM:&nbsp;</span>
            <span>{format(new Date(airdropDate), 'MM/dd/yyyy')}</span>
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
