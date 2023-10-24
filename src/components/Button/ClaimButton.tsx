import { getProof, updateClickCount } from '@/async_fns/backendCalls';
import { useClaimAirdrop } from '@/async_fns/wagmiHooks';
import { useC2PAuth } from '@/async_fns/wagmiHooks';
import { HexString } from '@/types/cryptoGenerics';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';

type Props = {
  root: HexString;
  contractId: bigint;
  supabaseId: number;
  claimCount: number;
  setClaimCount?: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function ClaimButton({
  root,
  contractId,
  supabaseId,
  claimCount,
  setClaimCount,
  setError,
}: Props) {
  const { pChainAddr } = useC2PAuth();
  const [proof, setProof] = useState<HexString[]>([]);

  useEffect(() => {
    fetchProof();
  }, []);

  async function fetchProof() {
    const { data: proofy } = await getProof(root, pChainAddr || '', '');
    if (proof === undefined) {
      console.warn('Proof undefined');
      return;
    }
    setProof(proofy.Proof);
  }

  async function recordClick() {
    try {
      const { data } = await updateClickCount(supabaseId, claimCount);
      setClaimCount && setClaimCount(data.newCount);
    } catch (e) {
      console.warn('Update click call failed');
    }
  }

  const { config, error } = useClaimAirdrop(contractId, proof);
  const { write: claim } = useContractWrite({ ...config });

  function handleClaim() {
    if (claim) {
      claim();
    } else {
      console.warn('claim is undefined, not claiming');
      return;
    }
    recordClick();
  }

  const regex = /Error: (.*)/;
  const errorMaybe = error?.message.match(regex);
  if (errorMaybe) {
    console.log('SETTING ERROR');
    setError(errorMaybe[1]);
  }

  return (
    <button
      onClick={() => handleClaim()}
      className="border cursor-pointer border-white px-4 py-2 text-xs transition-colors hover:border-primary-500 hover:text-primary-500 font-semibold tracking-widest"
      disabled={errorMaybe ? true : false}
    >
      CLAIM
    </button>
  );
}
