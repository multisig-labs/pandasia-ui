import Link from 'next/link';

export default function NotAuthorized() {
  return <Link href="/">You are not authorized to view this page, please register first</Link>;
}
