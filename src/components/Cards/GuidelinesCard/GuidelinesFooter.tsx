import { format } from 'date-fns';

type Props = {
  startsAt: number;
  tokenAmt: bigint;
};
export default function GuidelinesFooter({ startsAt, tokenAmt }: Props) {
  return (
    <div className="flex h-14 w-full items-center justify-between p-6">
      <div className="flex w-full flex-wrap gap-x-4 text-xs font-semibold tracking-wider text-secondary-400">
        <span>SUPPLY: {tokenAmt.toLocaleString()}</span>
        <span>AIRDROP STARTS: {format(new Date(Number(startsAt) * 1000), 'MM/dd/yyyy')}</span>
      </div>
    </div>
  );
}
