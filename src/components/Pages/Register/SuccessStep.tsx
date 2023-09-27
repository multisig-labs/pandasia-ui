import React from 'react';
import { TransactionReceipt } from 'viem';

type Props = {
  transaction: TransactionReceipt;
};

export default function SuccessStep({ transaction }: Props) {
  return (
    <section
      className={`flex min-h-screen w-full flex-col justify-center gap-2 bg-primary-500 p-6`}
    >
      <div className="flex flex-col gap-2 p-12">
        <div>Success!</div>
        <div className="flex flex-wrap">{transaction.transactionHash}</div>
      </div>
    </section>
  );
}
