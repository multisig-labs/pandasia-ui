import { format } from 'date-fns';
import Link from 'next/link';
import { formatEther } from 'viem';

type Props = {
  startsAt: bigint;
  balance: bigint;
  supabaseId: number;
};
export default function AirdropFooter({ supabaseId, startsAt, balance }: Props) {
  return (
    <div className="flex h-14 w-full items-center justify-between p-6">
      <div className="flex w-full flex-wrap justify-between gap-x-4 text-xs tracking-wider">
        <div className="flex gap-4 text-secondary-500">
          <span>SUPPLY: {formatEther(balance)}</span>
          <span>AIRDROP STARTS: {format(new Date(Number(startsAt) * 1000), 'MM/dd/yyyy')}</span>
        </div>
        <Link href={`/guidelines/${supabaseId}`} className="text-primary-600">
          VIEW GUIDELINES
        </Link>
      </div>
    </div>
  );
}
