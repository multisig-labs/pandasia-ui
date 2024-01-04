import { nodeIdDetails } from '@/async_fns/backendCalls';
import { errorMap, makeErrorFriendly } from '@/config/axiosConfig';
import axios from 'axios';
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
    try {
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = makeErrorFriendly(err);
        console.warn(error);
        const friendlyError = errorMap[error as keyof typeof errorMap] || 'Unknown Error';
        setNodeIdError(friendlyError);
      }
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
      className={`flex w-full min-h-screen flex-col items-center justify-center gap-2 bg-primary-400 pt-4 p-12`}
    >
      <div className="flex justify-center">
        <div className="flex h-full w-full flex-col justify-center basis-[660px]">
          <div className="flex items-center justify-between pb-2 font-semibold text-black">
            <span className="text-2xl">S I G N</span>
          </div>
          <hr className="border border-black"></hr>
          <div className="flex justify-center">
            <span className="flex max-w-sm pt-8 text-center font-bold tracking-[2px] text-black">
              FIRST ENTER YOUR NODEID TO VERIFY ELIGIBILTY
            </span>
          </div>
          <div className="flex flex-col gap-2 text-black pt-4">
            <div className="flex justify-center">
              <div className="flex basis-[460px] justify-center mt-4 border-2 border-transparent focus-within:border-2 focus-within:border-black">
                <input
                  value={nodeId}
                  onChange={handleChange}
                  className="text-sm w-full border-2 border-primary-500 bg-black focus-within:outline-none bg-opacity-10 p-2 text-secondary-800"
                  placeholder="Paste NodeID here..."
                />
                <button
                  className="flex justify-center items-center basis-12 bg-black p-1 text-sm text-white font-semibold tracking-[2px]"
                  onClick={submitNodeId}
                >
                  <DisplayNodeIcon />
                </button>
              </div>
            </div>
            {nodeIdError && (
              <div className="flex flex-col">
                <span className="max-w-sm text-center text-red-800">{nodeIdError}</span>
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
      </div>
    </section>
  );
}
