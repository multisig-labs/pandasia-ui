import { errorMap } from '@/config/axiosConfig';
import Image from 'next/image';

type Props = {
  signature: string;
  setSignature: (s: string) => void;
  submitSignature: () => void;
  sigError: string;
};

export default function SignatureInput({
  signature,
  setSignature,
  submitSignature,
  sigError,
}: Props) {
  return (
    <>
      <span className="flex justify-center pt-8">
        <Image src="/sign-icon.svg" alt="Signature Icon" width={56} height={50} priority />
      </span>
      <div className="flex w-full justify-center">
        <span className="flex max-w-sm py-4 text-center font-bold tracking-[2px] text-black">
          PASTE SIGNATURE TO COMPLETE VERIFICATION
        </span>
      </div>
      <div className="flex justify-center">
        <div className="flex basis-[460px] justify-center mt-4 border-2 border-transparent focus-within:border-2 focus-within:border-black">
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value.trim())}
            className="text-sm w-full border-2 border-primary-500 bg-black focus-within:outline-none bg-opacity-10 p-2 text-secondary-800"
            placeholder="Paste your signature here..."
          />
        </div>
      </div>
      {sigError && (
        <div className="flex flex-col">
          <span className="text-center text-red-800">
            {errorMap[sigError as keyof typeof errorMap] || 'Unknown Error'}
          </span>
        </div>
      )}
      <div className="flex justify-center pt-3">
        <button
          className="basis-56 bg-black p-4 text-sm text-white font-semibold tracking-[2px]"
          onClick={submitSignature}
        >
          SUBMIT SIGNATURE
        </button>
      </div>
    </>
  );
}
