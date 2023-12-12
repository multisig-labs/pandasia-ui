import { getProof, updateClickCount } from '@/async_fns/backendCalls';
import { useC2PAuth, useClaimAirdrop } from '@/async_fns/wagmiHooks';
import { HexString } from '@/types/cryptoGenerics';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';

type Props = {
  customRoot: HexString;
  contractId: bigint;
  supabaseId: number;
  claimCount: number;
  setClaimCount?: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function ClaimButton({
  customRoot,
  contractId,
  supabaseId,
  claimCount,
  setClaimCount,
  setError,
}: Props) {
  const { pChainAddr } = useC2PAuth();
  const [proof, setProof] = useState<HexString[]>([]);
  const { config, error } = useClaimAirdrop(contractId, proof);
  const { write: claim } = useContractWrite({ ...config });

  useEffect(() => {
    fetchProof();
  }, []);

  useEffect(() => {
    const regex = /Error: (.*)/;
    const errorMaybe = error?.message.match(regex);
    if (errorMaybe) {
      setError(errorMaybe[1]);
    } else {
      setError('');
    }
  }, [setError, error]);

  async function fetchProof() {
    // if there's no custom root, the getProof call to the backend will fail
    if (customRoot == '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return;
    }
    try {
      const { data: fetchedProof } = await getProof(customRoot, pChainAddr || '', '');
      if (fetchedProof === undefined) {
        console.warn('Proof undefined');
        return;
      }
      setProof(fetchedProof.Proof);
    } catch (err) {
      console.warn('err fetching proof', err);
    }
  }

  async function recordClick() {
    try {
      const { data } = await updateClickCount(supabaseId, claimCount);
      setClaimCount && setClaimCount(data.newCount);
    } catch (e) {
      console.warn('Update click call failed');
    }
  }

  function handleClaim() {
    if (claim) {
      claim();
    } else {
      console.warn('claim is undefined, not claiming');
      return;
    }
    recordClick();
  }

  return (
    <button
      onClick={() => handleClaim()}
      className="border disabled:cursor-not-allowed disabled:border-secondary-600 disabled:text-secondary-600 cursor-pointer border-white px-4 py-2 text-xs transition-colors hover:border-primary-500 hover:text-primary-500 font-semibold tracking-widest"
      disabled={error ? true : false}
    >
      CLAIM
    </button>
  );
}
