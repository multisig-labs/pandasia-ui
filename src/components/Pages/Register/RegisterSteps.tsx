import Toast from '@/components/Toast/Toast';
import { useState } from 'react';
import { useAccount } from 'wagmi';

type Props = {
  pChainAddr: string;
};

export default function RegisterSteps({ pChainAddr }: Props) {
  const { address: account } = useAccount();
  const [showToast, setShowToast] = useState(false);

  function CopyMachine({ text }: { text: string }) {
    return (
      <span
        onClick={() => {
          navigator.clipboard.writeText(`P-${pChainAddr}`);
          setShowToast(true);
        }}
        className="truncate font-bold cursor-pointer hover:underline"
      >
        {text}
      </span>
    );
  }
  return (
    <ol className="flex flex-col gap-4 py-8 text-black">
      <li className="flex gap-2 list-decimal">
        <span>1.</span>
        <span>
          Head to{' '}
          <a
            className="font-bold hover:underline"
            href="https://wallet.avax.network"
            target="_blank"
          >
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
        <span>
          In the address field, enter in your beneficiary address{' '}
          <CopyMachine text={`P-${pChainAddr}`} />
        </span>
      </li>
      <li className="flex gap-2">
        <span>5.</span>
        <span>
          In the message field, enter your C-Chain address <CopyMachine text={account as string} />
        </span>
      </li>
      <li className="flex gap-2">
        <span>6.</span>
        <span>Copy your signature string, and paste it in the input below.</span>
      </li>
      <Toast
        message={'Copied!'}
        setShowToast={setShowToast}
        showToast={showToast}
        duration={2000}
      />
    </ol>
  );
}
