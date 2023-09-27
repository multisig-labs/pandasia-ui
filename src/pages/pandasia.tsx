import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function Pandasia() {
  return (
    <main className="flex">
      <section className={`flex min-h-screen w-full flex-col items-center bg-secondary-800 p-6`}>
        <Link className="flex items-center gap-2 self-start text-primary-500" href={'/'}>
          <BsArrowLeft size={'24px'} />
          <span>RETURN</span>
        </Link>
        <div>Welcome to the Thunderdome</div>
      </section>
    </main>
  );
}
