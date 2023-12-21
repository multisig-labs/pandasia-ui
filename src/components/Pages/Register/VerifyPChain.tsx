type Props = {
  pChainAddr: string;
  setPChainAddr: (s: string) => void;
  submitAddress: () => void;
  exists: null | boolean;
  verifyMessage: string;
};

export default function VerifyPChain({
  pChainAddr,
  setPChainAddr,
  submitAddress,
  exists,
  verifyMessage,
}: Props) {
  let message;
  if (exists != null) {
    message = exists ? 'Verified!' : 'Address invalid';
  }
  console;
  return (
    <section
      className={`flex w-full flex-col items-center justify-center gap-2 bg-primary-400 p-12 pb-0`}
    >
      <div className="flex h-full w-full flex-col justify-center">
        <div className="flex items-center justify-between pb-2 font-semibold text-black">
          <span className="text-2xl">VERIFY P-CHAIN ADDRESS</span>
        </div>
        <hr className="border border-black"></hr>
        <span className="py-5 text-black">
          To confirm you're eligible for airdrops, paste your validator's rewards address below
        </span>
        <div className="flex justify-center relative">
          <input
            value={pChainAddr}
            onChange={(e) => setPChainAddr(e.target.value.trim())}
            className="basis-[460px] border-2 border-primary-700 bg-primary-400 p-4 text-secondary-800 focus-within:outline-2 focus-within:outline-primary-900"
            placeholder="P-Chain rewards address..."
          />
        </div>
        {verifyMessage && (
          <div className="flex flex-col p-2">
            {exists ? (
              <span className="text-center text-green-800">{verifyMessage}</span>
            ) : (
              <span className="text-center text-red-800">{verifyMessage}</span>
            )}
          </div>
        )}
        <div className="flex justify-center pt-2 p-4">
          <button
            className="basis-56 bg-black p-4 text-sm font-semibold tracking-[2px]"
            onClick={submitAddress}
          >
            VERIFY ADDRESS
          </button>
        </div>
      </div>
    </section>
  );
}
