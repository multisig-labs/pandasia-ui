import Toast from '@/components/Toast/Toast';
import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useAccount } from 'wagmi';

type Props = {
  pChainAddr: string;
};

export default function RegisterSteps({ pChainAddr }: Props) {
  const { address: account } = useAccount();
  const [showToast, setShowToast] = useState(false);

  function CopyMachine({ text }: { text: string }) {
    return (
      <div className="flex mt-4">
        <div
          onClick={() => {
            navigator.clipboard.writeText(text);
            setShowToast(true);
          }}
          className="flex justify-between w-full basis-[540px] border-2 border-primary-500 bg-black bg-opacity-10 p-2 truncate cursor-pointer hover:underline"
        >
          {text}
          <BiCopy size={25} color="" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <ol className="flex w-full basis-[660px] flex-col align-center gap-4 py-10 px-10 text-black">
        <li className="flex gap-2 list-decimal">
          <span>1.</span>
          <span>
            Head on over to{' '}
            <a className="font-bold underline" href="https://wallet.avax.network" target="_blank">
              wallet.avax.network
            </a>{' '}
            and access your wallet.
          </span>
        </li>
        <li className="flex gap-2">
          <span>2.</span>
          <span>
            Select the <span className="font-bold">Advanced</span> tab
          </span>
        </li>
        <li className="flex gap-2">
          <span>3.</span>
          <span>
            Find the <span className="font-bold">Sign Message</span> column.
          </span>
        </li>
        <li className="flex gap-2">
          <span>4.</span>
          <span className="w-full">
            In the address field, enter this beneficiary address{' '}
            <CopyMachine text={`P-${pChainAddr}`} />
          </span>
        </li>
        <li className="flex gap-2">
          <span>5.</span>
          <span className="w-full">
            In the message field, enter this C-Chain address{' '}
            <CopyMachine text={account as string} />
          </span>
        </li>
        <li className="flex gap-2">
          <span>6.</span>
          <span>
            {' '}
            To <span className="font-bold">complete verification</span>, copy the signature string,
            and paste it in the input below
          </span>
        </li>
        <Toast
          message={'Copied!'}
          setShowToast={setShowToast}
          showToast={showToast}
          duration={2000}
        />
      </ol>
    </div>
  );
}
