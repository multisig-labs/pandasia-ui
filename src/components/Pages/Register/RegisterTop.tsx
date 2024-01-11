import { nodeIdDetails } from '@/async_fns/backendCalls';
import { errorMap, makeErrorFriendly } from '@/config/axiosConfig';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

import { FaX } from 'react-icons/fa6';

type Props = {
  pChainAddr: string;
  setPChainAddr: (s: string) => void;
  hasLoaded: boolean;
  setHasLoaded: (b: boolean) => void;
};

export default function RegisterTop({ pChainAddr, setPChainAddr, hasLoaded, setHasLoaded }: Props) {
  const [nodeId, setNodeId] = useState('');
  const [nodeIdError, setNodeIdError] = useState('');
  const [context, setContext] = useState('First, enter your NodeID to verify your eligibility');

  function setContextVerified() {
    setContext('Complete the rest of the steps in order to qualify for those awesome airdrops!');
  }

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
      setContextVerified();
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
      return <FaCheck color="#70FF2D" />;
    } else if (nodeIdError) {
      return <FaX color="#FF0000" />;
    }
    return <FaArrowRight />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {hasLoaded && (
        <span className="flex justify-center pb-5">
          <Image src="/sign-icon.svg" alt="Signature Icon" width={68} height={60} priority />
        </span>
      )}
      <span className="w-full text-center text-2xl font-semibold text-black tracking-[4px]">
        {hasLoaded ? 'NODE VERIFIED' : "LET'S GET STARTED"}
      </span>
      <div className="flex w-full justify-center">
        <span className="w-full basis-[520px] pt-2 text-center tracking-[1px] text-black font-medium">
          {hasLoaded
            ? 'Complete the rest of the steps in order to qualify for those awesome airdrops!'
            : 'First, enter your Node ID to verify your eligibility'}
        </span>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col gap-2 text-black pt-4 basis-[520px]">
          <div className="flex w-full justify-center mb-2">
            <div className="flex w-full justify-center mt-4 border-2 border-transparent focus-within:border-2 focus-within:border-black">
              <input
                value={nodeId}
                onChange={handleChange}
                className="text-md w-full border-2 border-primary-500 bg-black focus-within:outline-none bg-opacity-10 p-3 text-secondary-800"
                placeholder="Paste NodeID here..."
              />
              <button
                className="flex justify-center items-center basis-16 bg-black p-3 px-5 text-sm text-white font-semibold tracking-[2px]"
                onClick={submitNodeId}
              >
                <DisplayNodeIcon />
              </button>
            </div>
          </div>
          {nodeIdError && (
            <div className="flex flex-col justify-center items-center">
              <span className="max-w-sm text-center text-red-800">{nodeIdError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
