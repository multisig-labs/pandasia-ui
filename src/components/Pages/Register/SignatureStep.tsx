import { nodeIdDetails } from '@/async_fns/backendCalls';
import { useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import RegisterSteps from './RegisterSteps';
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
  const [nodeIdError, setNodeIdError] = useState('');
  const [pChainAddr, setPChainAddr] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  const submitNodeId = async () => {
    if (!nodeId) {
      setNodeIdError('Please enter your NodeId');
      return;
    }
    const { data } = await nodeIdDetails(nodeId);
    const validators = data.validators;
    if (validators.length > 1) {
      setNodeIdError('More than one active validator with that NodeId');
      return;
    } else if (validators.length < 1) {
      setNodeIdError('NodeId not found');
      return;
    }
    const pAddr = validators[0].potentialRewards?.rewardAddresses[0];
    if (pAddr === null || pAddr === undefined) {
      setNodeIdError('Unable to fetch P-Chain address');
      return;
    }
    setPChainAddr(pAddr);
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  };

  function handleChange(e: any) {
    setNodeId(e.target.value.trim());
    setPChainAddr('');
    setNodeIdError('');
  }

  function DisplayNodeIcon() {
    if (pChainAddr) {
      return <FaCheck color="#00FF00" />;
    } else if (nodeIdError) {
      return <FaX color="#FF0000" />;
    }
    return <FaArrowRight />;
  }

  return (
    <section
      className={`flex w-full flex-col items-center justify-center gap-2 bg-primary-400 pt-4 p-12`}
    >
      <div className="flex h-full flex-col justify-center">
        <div className="flex items-center justify-between pb-2 font-semibold text-black">
          <span className="text-2xl">SIGN</span>
        </div>
        <hr className="border border-black"></hr>
        <span className="pt-5 font-bold tracking-[4px] text-black">STEPS TO COMPLETE</span>
        <div className="flex flex-col gap-2 text-black pt-8">
          <div className="flex gap-2">
            <span>
              First enter your NodeID and we'll make sure you're eligible and show the P-Chain
              address you should use.
            </span>
          </div>
          <div className="flex justify-center pt-4">
            <input
              value={nodeId}
              onChange={handleChange}
              className="text-sm basis-[460px] border-2 border-primary-700 bg-primary-400 p-1 text-secondary-800 focus-within:outline-2 focus-within:outline-primary-900"
              placeholder="Paste NodeID here..."
            />
            <button
              className="flex justify-center items-center basis-12 bg-black p-1 text-sm text-white font-semibold tracking-[2px]"
              onClick={submitNodeId}
            >
              <DisplayNodeIcon />
            </button>
          </div>
          {nodeIdError && (
            <div className="flex flex-col">
              <span className="text-center text-red-800">{nodeIdError}</span>
            </div>
          )}
        </div>

        {hasLoaded && (
          <div className="fade-in">
            <RegisterSteps pChainAddr={pChainAddr} />
            <hr className="border border-black"></hr>
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
