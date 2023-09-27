import { copyText, shortenNodeId } from '@/utils/utils';
import React from 'react';
import { TransactionReceipt } from 'viem';
import { RiFileCopy2Line } from 'react-icons/ri';

type Props = {
  transaction: TransactionReceipt;
};

export default function SuccessStep({ transaction }: Props) {
  return (
    <section
      className={`flex min-h-screen w-full flex-col justify-center gap-2 bg-primary-500 p-6`}
    >
      <div className="flex h-full flex-col justify-center gap-2 border-2 border-primary-700 p-12 text-black ">
        <div className="flex justify-center text-center">
          <span className="basis-96 font-semibold">
            Welcome to Pandasia! You are now able to claim and create airdrops.
          </span>
        </div>
        <div className="flex justify-center break-words">
          <span>Transaction Hash: {shortenNodeId(transaction.transactionHash)}</span>
          <span className="cursor-pointer" onClick={() => copyText(transaction.transactionHash)}>
            <RiFileCopy2Line size={24} />
          </span>
        </div>
        <div className="flex justify-center py-5">
          <a>
            <button className="bg-black p-4 text-xs font-semibold tracking-[2px] text-white">
              GO TO CLAIMS PAGE
            </button>
          </a>
        </div>
        <hr className="border border-primary-700"></hr>
      </div>
    </section>
  );
}
