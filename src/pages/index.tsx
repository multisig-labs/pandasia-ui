import Button from '@/components/Button/Button';
import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import UnregisterButton from '@/components/Button/UnregisterButton';
import Pandasia from '@/contracts/Pandasia';
import { HexString } from '@/types/cryptoGenerics';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { address: account } = useAccount();
  const { data: accountAddr } = useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'c2p',
    args: [account as HexString],
    watch: true,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className={`welcome-bg relative flex min-h-screen flex-col justify-center`}>
      {isClient && (
        <div className="flex h-screen w-full flex-col items-center">
          <Image
            className="absolute"
            width={88}
            height={103}
            alt="pandasia logo"
            src={'/favicon.svg'}
          />
          <div className="absolute top-1/2 z-10 mt-[-12px] border-4 border-primary-600 bg-secondary-900 p-1">
            <div className="border border-primary-600 p-1">
              {accountAddr && parseInt(accountAddr, 16) !== 0 ? (
                <>
                  <Link href={'/pandasia'}>
                    <button className="hover-underline-animation tracking-[4px] text-primary-600">
                      ENTER PANDASIA
                    </button>
                  </Link>
                  <UnregisterButton />
                </>
              ) : (
                <Link href={'/register'}>
                  <button className="hover-underline-animation tracking-[4px] text-primary-500">
                    REGISTER
                  </button>
                </Link>
              )}
            </div>
          </div>
          <hr className="absolute top-1/2 mt-[12px] w-full border border-primary-600"></hr>
          <span className="absolute top-1/2 mt-40">
            <CustomConnectButton />
          </span>
          <span className="absolute bottom-0 text-xs tracking-widest text-primary-600">
            MADE WITH FIRE BY GOGOPOOL
          </span>
        </div>
      )}
    </main>
  );
}
