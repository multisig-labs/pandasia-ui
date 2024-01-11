import { errorMap } from '@/config/axiosConfig';

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
      <div className="flex w-full justify-center">
        <span className="flex max-w-sm py-4 pt-8 text-center font-bold tracking-[2px] text-black">
          PASTE SIGNATURE
        </span>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex basis-[480px] items-center justify-center m-0 p-1 border-2 border-primary-700">
          <div className="flex basis-[480px] justify-center items-center border-2 border-transparent focus-within:border-2 focus-within:border-black">
            <input
              value={signature}
              onChange={(e) => setSignature(e.target.value.trim())}
              className="text-sm w-full border-2 border-primary-500 bg-black focus-within:outline-none bg-opacity-10 p-2 text-secondary-800"
              placeholder="Paste signature here to copmlete verification..."
            />
          </div>
        </div>
      </div>
      {sigError && (
        <div className="flex flex-col">
          <span className="text-center text-red-800">
            {errorMap[sigError as keyof typeof errorMap] || 'Unknown Error'}
          </span>
        </div>
      )}
      <div className="flex justify-center pt-6">
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
