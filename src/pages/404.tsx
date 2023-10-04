import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import Image from 'next/image';

export default function Custom404() {
  return (
    <LayoutAndNavbar>
      <div className="flex w-full flex-col items-center justify-center pt-12">
        <Image width={120} height={150} alt="pandasia logo" src={'/favicon.svg'} />
        <span className="pt-4 text-xl text-primary-500">
          <span className="text-red-400">Error 404:&nbsp;</span>
          <span>Page not found.</span>
        </span>
      </div>
    </LayoutAndNavbar>
  );
}
