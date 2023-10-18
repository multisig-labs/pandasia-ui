import { HexString } from '@/types/cryptoGenerics';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type Props = {
  erc20Address: HexString;
  logo: string;
};

export default function Logo({ erc20Address, logo }: Props) {
  const [logoUrl, setLogoUrl] = useState(
    `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
  );

  async function test() {
    try {
      const res = await axios.get(
        `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
      );
      setLogoUrl(
        `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${erc20Address}/logo.png`,
      );
    } catch {
      setLogoUrl(
        'https://private-user-images.githubusercontent.com/13784188/276352173-e87ec7e8-7def-459b-9c1a-c00160b81b87.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTc2NTI0NDcsIm5iZiI6MTY5NzY1MjE0NywicGF0aCI6Ii8xMzc4NDE4OC8yNzYzNTIxNzMtZTg3ZWM3ZTgtN2RlZi00NTliLTljMWEtYzAwMTYwYjgxYjg3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEwMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMDE4VDE4MDIyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQyMjBiMDM3M2JkZmNiOWEwMGJkM2Q5Yzg3OGM4OGJlMTVmOGNkYmM3NWM5NDMxNTUwYzZiMWU2NzA2NzE3N2UmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.pMlFCnZcbmLIHWgysf2pkKLvSxaXG6ZDRTQMTkob-uY',
      );
    }
  }

  useEffect(() => {
    test();
  }, []);

  return <Image src={logoUrl} width={50} height={50} alt="logo" />;
}
