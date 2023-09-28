import { copyText, shortenNodeId } from '@/utils/utils';
import React from 'react';
import { TransactionReceipt } from 'viem';
import { RiFileCopy2Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  transaction: TransactionReceipt;
};

export default function SuccessStep({ transaction }: Props) {
  return (
    <section className={`success-bg flex min-h-screen w-full flex-col justify-center gap-2 p-6`}>
      <div className="flex h-full flex-col justify-center gap-2 border border-primary-600 p-12 text-black ">
        <Image
          className="self-center"
          src={'/youre-in-image-text.svg'}
          alt="You're In!"
          width={650}
          height={200}
        />
        <div className="flex justify-center text-center">
          <span className="basis-96 pt-2">
            Welcome to Pandasia! You are now able to claim and create airdrops.
          </span>
        </div>

        <div className="flex justify-center pb-5 pt-2">
          <Link href={'/pandasia'}>
            <button className="bg-black p-4 text-xs font-semibold tracking-[2px] text-white">
              GO TO CLAIMS PAGE
            </button>
          </Link>
        </div>
        <hr className="border-primary-600"></hr>
        <div className="flex justify-center break-words">
          <span>Transaction Hash: {shortenNodeId(transaction.transactionHash)}</span>
          <span className="cursor-pointer" onClick={() => copyText(transaction.transactionHash)}>
            <RiFileCopy2Line size={24} />
          </span>
        </div>
      </div>
    </section>
  );
}
