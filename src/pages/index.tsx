import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import UnregisterButton from '@/components/Button/UnregisterButton';
import { useC2PAuth } from '@/async_fns/wagmiHooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FadeTransition } from '@/components/Pages/PageTransitions';
import Lottie from 'lottie-react';
import pandasiaBg from '@/styles/lottie/pandasia-background.json';
import { getAccount } from 'wagmi/actions';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  const { isConnected } = getAccount();
  const [isClient, setIsClient] = useState(false);
  const { pChainAddr } = useC2PAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log({ address, isConnected });

  const displayButton = () => {
    if (!address) {
      return <CustomConnectButton />;
    }
    if (!pChainAddr || parseInt(pChainAddr, 16) === 0) {
      return (
        <Link href={'/register'}>
          <button className="hover-underline-animation tracking-[4px] text-primary-500">
            REGISTER
          </button>
        </Link>
      );
    }
    return (
      <>
        <Link href={'/airdrops'}>
          <button className="hover-underline-animation tracking-[4px] text-primary-600">
            ENTER PANDASIA
          </button>
        </Link>
        <UnregisterButton />
      </>
    );
  };

  return (
    <FadeTransition>
      <main className={`welcome-bg relative flex min-h-screen flex-col justify-center`}>
        {isClient && (
          <div className="z-10 flex h-screen w-full flex-col items-center">
            <Image
              className="absolute z-10"
              width={88}
              height={103}
              alt="pandasia logo"
              src={'/favicon.svg'}
            />
            <Lottie animationData={pandasiaBg} loop={false} style={{ height: '100vh' }} />
            <div className="absolute top-1/2 z-10 mt-[-12px] border-4 border-primary-600 bg-secondary-900 p-1">
              {displayButton()}
            </div>
            <hr className="absolute top-1/2 mt-[12px] w-full border border-primary-600"></hr>
            <span className="z-10 absolute bottom-0 text-xs tracking-widest text-primary-600">
              MADE WITH FIRE BY MULTISIGLABS
            </span>
          </div>
        )}
      </main>
    </FadeTransition>
  );
}
