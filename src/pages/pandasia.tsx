import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function Pandasia() {
  return (
    <main className="flex">
      <section className={`p-6 flex flex-col w-full items-center min-h-screen bg-secondary-800`}>
        <Link className="self-start flex items-center gap-2 text-primary-500" href={'/'}>
          <BsArrowLeft size={'24px'} />
          <span>RETURN</span>
        </Link>
        <div>Welcome to the Thunderdome</div>
      </section>
    </main>
  );
}
