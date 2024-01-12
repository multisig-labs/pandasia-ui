import { useState } from 'react';
import RegisterSteps from './RegisterSteps';
import RegisterTop from './RegisterTop';
import SignatureInput from './SignatureInput';

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
  const [pChainAddr, setPChainAddr] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <section
      className={`flex w-full min-h-screen flex-col items-center justify-center gap-2 bg-primary-400 pt-4 p-12`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center basis-[460px]">
        <RegisterTop
          pChainAddr={pChainAddr}
          setPChainAddr={setPChainAddr}
          hasLoaded={hasLoaded}
          setHasLoaded={setHasLoaded}
        />

        {hasLoaded && (
          <div className="flex flex-col w-full fade-in">
            <div className="flex w-full justify-center items-center">
              <hr className="basis-[700px] w-full border-x-0 border-black mt-8"></hr>
            </div>
            <RegisterSteps pChainAddr={pChainAddr} />
            <div className="flex w-full justify-center items-center">
              <hr className="basis-[700px] border-x-0 border-black"></hr>
            </div>
            <SignatureInput
              signature={signature}
              setSignature={setSignature}
              submitSignature={submitSignature}
              sigError={sigError}
            />
          </div>
        )}
      </div>
    </section>
  );
}
