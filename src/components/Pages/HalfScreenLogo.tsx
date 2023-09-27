import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function HalfScreenLogo() {
  return (
    <section
      className={`hidden min-h-screen w-full flex-col items-center bg-secondary-800 p-6 md:flex`}
    >
      <Link className="flex items-center gap-2 self-start text-primary-500" href={'/'}>
        <BsArrowLeft size={'24px'} />
        <span>RETURN</span>
      </Link>

      <div className="flex h-full flex-col items-center justify-center">
        <Image src="/pandasia-logo.svg" alt="Pandasia Logo" width={180} height={180} priority />
        <span className="text-primary-500">BY GOGOPOOL</span>
      </div>
    </section>
  );
}
