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
import { useRouter } from 'next/router';

export default function Home() {
  const { address } = useAccount();
  const { isConnected } = getAccount();
  const { pChainAddr } = useC2PAuth();
  const router = useRouter();

  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  const [s3, setS3] = useState(false);
  const [s4, setS4] = useState(false);
  const [isClient, setIsClient] = useState(false);
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
        {/*
        <UnregisterButton />
        */}
      </>
    );
  };

  if (s1 && s2 && s3 && s4) {
    return (
      <main className="hs-bg relative flex h-screen flex-col bg-secondary-800 items-center justify-center">
        <iframe
          width="1000"
          height="630"
          src="https://www.youtube.com/embed/7o4EI_-5reA?si=vjMuVkyBRT-Co-8l"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
      </main>
    );
  }

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
            <div className="relative">
              <div onClick={() => setS1(true)} className="left-28 absolute z-10 w-14 h-12"></div>
              <div onClick={() => setS2(true)} className="right-28 absolute z-10 w-14 h-12"></div>
              <div
                onClick={() => setS3(true)}
                className="left-28 bottom-0 z-10 absolute w-14 h-12"
              ></div>
              <div
                onClick={() => setS4(true)}
                className="right-28 bottom-0 z-10 absolute w-14 h-12"
              ></div>
              <Lottie
                animationData={pandasiaBg}
                loop={false}
                style={{ height: '100vh', position: 'relative' }}
              />
            </div>
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
