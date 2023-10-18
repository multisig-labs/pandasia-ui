import { getProof } from '@/async_fns/pandasia';
import { useClaimAirdrop } from '@/async_fns/wagmi';
import { useC2PAuth } from '@/hooks/useC2PAuth';
import { HexString } from '@/types/cryptoGenerics';
import { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';

type Props = {
  root: HexString;
  contractId: bigint;
};

export default function ClaimButton({ root, contractId }: Props) {
  const { pChainAddr } = useC2PAuth();
  const [proof, setProof] = useState<HexString[]>([]);

  useEffect(() => {
    fetchProof();
  }, []);

  async function fetchProof() {
    const { data: proofy } = await getProof(root, pChainAddr || '', '');
    if (proof === undefined) {
      console.warn('proof undefined');
      return;
    }
    setProof(proofy.Proof);
  }

  const { config, error, isError } = useClaimAirdrop(contractId, proof);
  const { write: claim } = useContractWrite({ ...config });

  const regex = /Error: (.*)/;
  const errorMaybe = error?.message.match(regex);
  return (
    <div>
      {errorMaybe && <div>{errorMaybe[1]}</div>}
      <button
        onClick={claim}
        className="border border-white px-4 py-2 text-xs font-semibold tracking-widest"
        disabled={errorMaybe ? true : false}
      >
        CLAIM
      </button>
    </div>
  );
}
