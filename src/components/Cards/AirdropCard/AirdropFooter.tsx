import { format } from 'date-fns';

type Props = {
  airdropDate: number;
  tokenAmt: bigint;
};
export default function AirdropFooter({ airdropDate, tokenAmt }: Props) {
  return (
    <div className="flex h-14 w-full items-center justify-between p-6">
      <div className="flex w-full flex-wrap justify-between gap-x-4 text-xs tracking-wider">
        <div className="flex gap-4 text-secondary-500">
          <span>SUPPLY: {tokenAmt.toLocaleString()}</span>
          <span>AIRDROP DATE: {format(new Date(airdropDate), 'MM/dd/yyyy')}</span>
        </div>
        <span className="text-primary-600">VIEW GUIDELINES</span>
      </div>
    </div>
  );
}
