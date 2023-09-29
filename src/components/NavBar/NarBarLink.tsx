import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  link: string;
};

export default function NarBarLink({ name, link }: Props) {
  return (
    <div className="py-5 text-primary-600">
      <Link href={link}>
        <span className="hover-glow">{name}</span>
      </Link>
    </div>
  );
}
