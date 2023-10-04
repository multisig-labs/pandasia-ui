import { copyText, shortenNodeId } from '@/utils/utils';
import { RiFileCopy2Line } from 'react-icons/ri';

type Props = {
  title: string;
  info: string;
  color?: string;
  isHash?: boolean;
};

export default function AirdropInfo({ title, info, color, isHash }: Props) {
  return (
    <div className="dotted-bottom-border flex justify-between py-2">
      <span>{title}</span>
      {isHash ? (
        <div className={`flex gap-2 ${color}`}>
          <span>{shortenNodeId(info)}</span>
          <span className="cursor-pointer" onClick={() => copyText(info)}>
            <RiFileCopy2Line size={22} />
          </span>
        </div>
      ) : (
        <span className={`${color}`}>{info}</span>
      )}
    </div>
  );
}
