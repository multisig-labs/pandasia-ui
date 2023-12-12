import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { FadeTransition } from '@/components/Pages/PageTransitions';
import Image from 'next/image';

export default function about() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-12">
      <Image width={120} height={150} alt="pandasia logo" src={'/favicon.svg'} />
      <span className="pt-4 text-xl text-primary-500">
        <span className="text-red-400">Error 404:&nbsp;</span>
        <span>Page not found.</span>
      </span>
    </div>
  );

  return (
    <FadeTransition>
      <LayoutAndNavbar>
        <div className="flex flex-col items-center w-full pl-4">
          <div className="flex w-full flex-col">
            <div className="flex justify-center gap-20">
              <div className="flex">
                <span className="flex pt-8 items-center justify-center font-semibold tracking-[4px] text-secondary-700">
                  <Image
                    src="/about-pandasia.png"
                    alt="Pandasia Logo"
                    width={250}
                    height={250}
                    priority
                  />
                </span>
              </div>
              <div className="flex flex-col max-w-[600px]">
                <span className="flex pt-8 font-semibold text-2xl tracking-[4px] text-primary-600">
                  PANDASIA
                </span>
                <span className="flex pt-2 text-lg">
                  Welcome to the symposium for Avalanche's most dedicated users. Pandasia is
                  inspired by one of the Charities: Pandaisia (Πανδαισία), the goddess of the
                  banquet. This echos our design philosophy, we wanted a place for people to come
                  from all over the Avalanche ecosystem and have a place to provide rewards to those
                  most integrated in Avalanche through airdrops.
                </span>
                <span className="flex pt-2 text-lg">
                  More technically, we wanted to have a verifiable way for validators of subnets to
                  be rewarded for their commitment to the space. In order to provide this we came up
                  with a way to tie a C-chain address to a P-chain address that is attached to a
                  validator node. In doing so, we can provide airdrops directly to your C-chain
                  wallet address.
                </span>
                <span className="flex pt-8 font-semibold text-2xl tracking-[4px] text-primary-600">
                  WHO WE ARE
                </span>
                <span className="pt-2 text-lg">
                  We are Multisig Labs. Our goal is to provide infrastructure and technology that
                  encourages widespread adoption of Subnets. Pandasia is an extension of that
                  desire. You can check out our flagship app{' '}
                  <a
                    href="https://app.gogopool.com"
                    className="text-primary-600 hover:underline"
                    target="_blank"
                  >
                    GoGoPool
                  </a>{' '}
                  or you can visit our socials by using the links on the navbar at the top of the
                  page.
                </span>
              </div>
            </div>
          </div>
        </div>
      </LayoutAndNavbar>
    </FadeTransition>
  );
}
