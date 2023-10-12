import { HexString } from '@/types/cryptoGenerics';
import Image from 'next/image';

export type Props = {
  erc20Address: HexString;
};

export default function Logo({ erc20Address }: Props) {
  const url = `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`;
  return <Image src={url} width={50} height={50} alt={erc20Address} />;
}
