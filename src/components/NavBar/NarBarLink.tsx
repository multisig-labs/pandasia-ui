import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  link: string;
  blank?: boolean;
};

export default function NarBarLink({ name, link, blank }: Props) {
  return (
    <div className="py-5 text-primary-600">
      <Link href={link} target={`${blank ? '_blank' : ''}`}>
        <span className="hover-glow">{name}</span>
      </Link>
    </div>
  );
}
