import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import UnregisterButton from '@/components/Button/UnregisterButton';
import { useC2PAuth } from '@/async_fns/wagmiHooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { pChainAddr } = useC2PAuth();

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
              {!pChainAddr || parseInt(pChainAddr, 16) === 0 ? (
                <Link href={'/register'}>
                  <button className="hover-underline-animation tracking-[4px] text-primary-500">
                    REGISTER
                  </button>
                </Link>
              ) : (
                <>
                  <Link href={'/airdrops'}>
                    <button className="hover-underline-animation tracking-[4px] text-primary-600">
                      ENTER PANDASIA
                    </button>
                  </Link>
                  <UnregisterButton />
                </>
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
