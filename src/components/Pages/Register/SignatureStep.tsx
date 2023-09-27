import Button from '@/components/Button/Button';
import { CustomConnectButton } from '@/components/Button/CustomConnectButton';

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
      className={`flex min-h-screen w-full flex-col justify-center gap-2 bg-primary-500 p-6`}
    >
      <div className="flex flex-col gap-2 p-12">
        <CustomConnectButton />
        <div className="flex items-center justify-between border-b border-black font-semibold text-black">
          <span className="text-2xl">S I G N</span>
        </div>
        <span className="font-semibold tracking-[4px] text-black">STEPS TO COMPLETE</span>
        <ol className="text-black">
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
              under the Sign Message column.
            </span>
          </li>

          <li className="flex gap-2">
            <span>3.</span>
            <span>
              Copy your C-Chain address and paste it in the Message box, and click Sign Message.
            </span>
          </li>
          <li className="flex gap-2">
            <span>4.</span>
            <span>Copy your signature string, and paste it in the Signature input below.</span>
          </li>
        </ol>
        <label>Signature</label>
        <textarea
          value={signature}
          onChange={(e) => setSignature(e.target.value.trim())}
          className="resize-none p-4 text-secondary-800"
          placeholder="Signature"
        />
        <span className="text-red-800">{sigError}</span>
        <Button onClick={submitSignature}>Submit Sig</Button>
      </div>
    </section>
  );
}
