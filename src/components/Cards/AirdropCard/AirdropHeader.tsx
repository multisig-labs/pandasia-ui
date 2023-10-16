import { getProof } from '@/async_fns/pandasia';
import { useClaimAirdrop } from '@/async_fns/wagmi';
import Logo from '@/components/Logo';
import { useC2PAuth } from '@/hooks/useC2PAuth';
import { HexString } from '@/types/cryptoGenerics';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';

type Props = {
  contractId: bigint;
  expiresAt: bigint;
  companyName: string;
  erc20Address: HexString;
  root: HexString;
};

export default function AirdropHeader({
  contractId,
  expiresAt,
  companyName,
  erc20Address,
  root,
}: Props) {
  const { pChainAddr } = useC2PAuth();
  const [proof, setProof] = useState<HexString[]>([]);

  useEffect(() => {
    fetchProof();
  }, []);

  console.log('proof', proof);
  console.log('contractid', contractId);
  console.log('pchainadddr', pChainAddr);

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

  // if (error) {
  //   return <div>{`${error.message}`}</div>;
  // }

  console.log('error', error);
  console.log('iserror', isError);

  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-secondary-700 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-700 bg-secondary-900">
          <Logo erc20Address={erc20Address} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{companyName.toUpperCase()}</span>
          <span className="text-xs font-semibold">
            <span className="text-secondary-500">AIRDROP ENDS:&nbsp;</span>
            <span>{format(new Date(Number(expiresAt) * 1000), 'MM/dd/yyyy')}</span>
          </span>
        </div>
      </div>

      <div>
        <button
          onClick={claim}
          className="border border-white px-4 py-2 text-xs font-semibold tracking-widest"
        >
          CLAIM
        </button>
      </div>
    </div>
  );
}
