import Button from '@/components/Button/Button';
import { CustomConnectButton } from '@/components/Button/CustomConnectButton';
import Image from 'next/image';

type Props = {
  signature: string;
  setSignature: (s: string) => void;
  submitSignature: () => void;
  sigError: string;
};

export default function SignatureStep({
  signature,
  setSignature,
  submitSignature,
  sigError,
}: Props) {
  return (
    <section
      className={`flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-primary-500 p-12`}
    >
      <CustomConnectButton />
      <div className="flex h-full flex-col justify-center p-12">
        <div className="flex items-center justify-between pb-2 font-semibold text-black">
          <span className="text-2xl">S I G N</span>
        </div>
        <hr className="border border-black"></hr>
        <span className="pt-5 font-bold tracking-[4px] text-black">STEPS TO COMPLETE</span>
        <ol className="flex flex-col gap-4 py-8 text-black">
          <li className="flex gap-2">
            <span>1.</span>
            <span>
              Go to{' '}
              <a className="font-bold" href="https://wallet.avax.network" target="_blank">
                wallet.avax.network
              </a>{' '}
              and access your wallet
            </span>
          </li>
          <li className="flex gap-2">
            <span>2.</span>
            <span>
              Select the Advanced tab. Copy your P-Chain address and paste it in the Address Field
              under the <span className="font-bold">Sign Message</span> column.
            </span>
          </li>

          <li className="flex gap-2">
            <span>3.</span>
            <span>
              Copy your C-Chain address and paste it in the Message box, and click{' '}
              <span className="font-bold">Sign Message.</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span>4.</span>
            <span>Copy your signature string, and paste it in the input below.</span>
          </li>
        </ol>
        <hr className="border border-black"></hr>
        <span className="flex justify-center pt-8">
          <Image src="/sign-icon.svg" alt="Signature Icon" width={56} height={50} priority />
        </span>
        <div className="flex w-full justify-center">
          <span className="flex max-w-sm py-4 text-center font-bold tracking-[4px] text-black">
            PASTE SIGNATURE TO COMPLETE VERIFICATION
          </span>
        </div>
        <div className="flex justify-center">
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value.trim())}
            className="basis-[460px] border-2 border-primary-700 bg-primary-400 p-4 text-secondary-800 focus-within:outline-2 focus-within:outline-primary-900"
            placeholder="Paste your signature here..."
          />
        </div>
        <span className="text-center text-red-800">{sigError}</span>
        <div className="flex justify-center pt-5">
          <button
            className="basis-56 bg-black p-4 text-sm font-semibold tracking-[2px]"
            onClick={submitSignature}
          >
            SUBMIT SIGNATURE
          </button>
        </div>
        <div className="flex justify-center">
          <span className="flex max-w-sm pt-2 text-center text-sm font-bold tracking-[4px] text-primary-700 underline">
            CANCEL
          </span>
        </div>
      </div>
    </section>
  );
}
