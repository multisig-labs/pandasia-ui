import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={`flex flex-col p-12 justify-center min-h-screen bg-secondary-800`}>
      <div className="flex flex-col w-80 gap-2">
        <span className="text-4xl text-primary-300">PANDASIA</span>
        <span className="text-primary-500">
          Just say anything, George, say what ever's natural, the first thing that comes to your
          mind. Take that you mutated son-of-a-bitch. My pine, why you. You space bastard, you
          killed a pine. You do? Yeah, it's 8:00. Hey, McFly, I thought I told you never to come in
          here. Well it's gonna cost you. How much money you got on you?
        </span>
        <Link href={'/register'}>
          <Button>Register</Button>
        </Link>
      </div>
    </main>
  );
}
