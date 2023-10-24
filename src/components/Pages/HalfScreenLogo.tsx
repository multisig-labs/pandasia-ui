import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { CustomConnectButton } from '../Button/CustomConnectButton';

export default function HalfScreenLogo() {
  return (
    <section className={`hs-bg hidden min-h-screen w-full flex-col items-center p-6 md:flex`}>
      <div className="flex w-full items-center text-primary-500">
        <Link className="flex gap-2" href={'/'}>
          <BsArrowLeft size={'24px'} />
          <span>RETURN</span>
        </Link>
      </div>

      <div className="flex h-full flex-col items-center justify-center">
        <Image src="/pandasia-logo.svg" alt="Pandasia Logo" width={180} height={180} priority />
        <span className="text-primary-500">BY MULTISIGLABS</span>
        <div className="pt-2">
          <CustomConnectButton />
        </div>
      </div>
    </section>
  );
}
