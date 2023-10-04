import { format } from 'date-fns';

type Props = {
  expiresAt: number;
};
export default function GuidelinesHeader({ expiresAt }: Props) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">TIME LEFT TO CLAIM:&nbsp;</span>
            <span>{format(new Date(expiresAt), 'MM/dd/yyyy')}</span>
          </span>
        </div>
      </div>

      <div>
        <button className="border border-primary-600 bg-secondary-900 px-4 py-2 text-xs font-semibold tracking-[4px] text-primary-600">
          CLAIM
        </button>
      </div>
    </div>
  );
}
