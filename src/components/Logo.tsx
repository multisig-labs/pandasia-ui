import { HexString } from '@/types/cryptoGenerics';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type Props = {
  erc20Address: HexString;
  logo: string;
  size: number;
};

export default function Logo({ erc20Address, logo, size }: Props) {
  const [logoUrl, setLogoUrl] = useState(
    `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
  );

  const randomish = Math.floor(Math.random() * 100 + 100);

  const reggy = /http/;
  const hasHttp = reggy.test(logo);

  async function logoFetch() {
    if (hasHttp) {
      try {
        const res = await axios.get(logo);
        setLogoUrl(logo);
      } catch {
        try {
          const res = await axios.get(
            `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
          );
          setLogoUrl(
            `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
          );
        } catch {
          setLogoUrl(`/logo-placeholder.svg`);
        }
      }
    } else {
      try {
        const res = await axios.get(
          `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
        );
        setLogoUrl(
          `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
        );
      } catch {
        setLogoUrl(`/logo-placeholder.svg`);
      }
    }
  }

  useEffect(() => {
    logoFetch();
  }, []);

  return <Image src={logoUrl} width={size} height={size} alt="logo" />;
}
