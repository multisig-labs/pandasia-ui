import { useC2PAuth, useIsMinipoolOperator } from '@/async_fns/wagmiHooks';
import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import { FadeTransition } from '@/components/Pages/PageTransitions';
import pandasiaBg from '@/styles/lottie/pandasia-background.json';
import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  const { pChainAddr } = useC2PAuth();
  const { isOperator } = useIsMinipoolOperator();

  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  const [s3, setS3] = useState(false);
  const [s4, setS4] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayButton = () => {
    if (!address) {
      return <CustomConnectButton />;
    }
    if ((pChainAddr && parseInt(pChainAddr, 16) != 0) || isOperator) {
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
    }
    return (
      <Link href={'/register'}>
        <button className="hover-underline-animation tracking-[4px] text-primary-500">
          REGISTER
        </button>
      </Link>
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
                // 14 px of margin to center the background image
                style={{ height: '100vh', position: 'relative', marginRight: '14px' }}
              />
            </div>
            <div className="absolute top-1/2 z-10 mt-[-12px] border-4 border-primary-600 bg-secondary-900 p-2">
              {displayButton()}
            </div>
            <hr className="absolute top-1/2 mt-[12px] w-full border border-primary-600"></hr>
            <div className="flex z-10 gap-12 absolute bottom-3 text-xs tracking-widest text-primary-600">
              <Link
                href={'https://twitter.com/GoGoPool_/status/1734639202879361151'}
                target="_blank"
                className="flex gap-2"
              >
                <BsTwitter size={16} />
              </Link>
              <span>THE SECRETS OUT. ARE YOU IN?</span>
              <Link
                href={'https://github.com/multisig-labs/pandasia'}
                target="_blank"
                className="flex gap-2"
              >
                <BsGithub size={16} />
              </Link>
            </div>
          </div>
        )}
      </main>
    </FadeTransition>
  );
}
