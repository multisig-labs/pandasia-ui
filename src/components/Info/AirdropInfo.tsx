import { copyText, shortenNodeId } from '@/utils/utils';
import { ReactNode } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri';

type Props = {
  title: string;
  info: ReactNode | string;
  color?: string;
  isHash?: boolean;
};

export default function AirdropInfo({ title, info, color, isHash }: Props) {
  return (
    <div className="dotted-bottom-border flex justify-between py-2">
      <span className="basis-60">{title}</span>
      {isHash ? (
        <div className={`flex gap-2 ${color}`}>
          <span>{shortenNodeId(info as string)}</span>
          <span className="cursor-pointer" onClick={() => copyText(info as string)}>
            <RiFileCopy2Line size={22} />
          </span>
        </div>
      ) : (
        <span className={`${color} break-all`}>{info}</span>
      )}
    </div>
  );
}
