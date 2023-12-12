import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import NavBar from '../NavBar/NavBar';

type Props = {
  children: ReactNode[] | ReactNode;
};

export default function LayoutAndNavbar({ children }: Props) {
  return (
    <main className="hs-bg relative flex min-h-screen flex-col items-center bg-secondary-800">
      <div className="absolute left-8 top-4 hidden 2xl:flex">
        <div className="flex h-full flex-col items-center justify-center">
          <Link href={'/'}>
            <Image src="/pandasia-logo.svg" alt="Pandasia Logo" width={102} height={142} priority />
          </Link>
          <span className="text-xs text-primary-500">BY MULTISIGLABS</span>
        </div>
      </div>
      <section className="flex w-full max-w-7xl p-6 pb-4">
        <NavBar />
      </section>
      <div className="flex w-full max-w-7xl flex-col px-6">
        <hr className="h-[1px] w-full border-none bg-secondary-700"></hr>
        <hr className="mt-3 h-[1px] w-full border-none bg-secondary-700"></hr>
      </div>
      <section className="text-white flex w-full max-w-7xl px-6">{children}</section>
    </main>
  );
}
