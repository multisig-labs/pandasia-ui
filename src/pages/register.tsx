import { getProof, getSig, getTreeData } from '@/async_fns/pandasia';
import { verify } from '@/async_fns/viem';
import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import { returnErrString } from '@/config/axios';
import { publicClient, walletClient } from '@/config/viem';
import Pandasia from '@/contracts/Pandasia';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useQuery } from 'react-query';

export default function Register() {
  const [signature, setSignature] = useState('');
  const [sigError, setSigError] = useState('');

  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);
  if (treesLoading) {
    return null;
  }

  if (trees === undefined) {
    return <span>Error retreiving trees</span>;
  }

  const submitSignature = async () => {
    try {
      // Gets SigV, SigR, SigS from a given signature
      const { data: sig } = await getSig(signature);
      if (sig === undefined) {
        console.warn('sig undefined');
        return;
      }
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Recovers the pChain address from the signature
      const pAddr = await publicClient.readContract({
        account: address,
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'recoverMessage',
        args: [parseInt(sig.SigV, 16), sig.SigR, sig.SigS],
      });

      // Using the merkle root, pChain address, and signature we can obtain a proof that the pChain address is in the merkle tree
      const { data: proof } = await getProof(trees[0].Root, pAddr, signature);
      if (proof === undefined) {
        console.warn('proof undefined');
        return;
      }
      const { request: register } = await publicClient.simulateContract({
        account: address,
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'registerPChainAddr',
        args: [parseInt(proof.SigV, 16), proof.SigR, proof.SigS, proof.Proof],
      });

      // After confirming the pChain address is in the tree, we register the pChain address
      const txnHash = await walletClient.writeContract(register);
      const transaction = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setSigError('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = returnErrString(err);
        console.warn(err);
        setSigError(error);
      } else {
        console.warn(err);
      }
    }
  };

  /*
      Test signature 24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx
      P-addr P-avax1gfpj30csekhwmf4mqkncelus5zl2ztqzvv7aww
      hex    0x424328bf10cdaeeda6bb05a78cff90a0bea12c02
  */
  return (
    <main className="flex">
      <section
        className={`hidden md:flex p-6 flex-col w-full items-center min-h-screen bg-secondary-800`}
      >
        <Link className="self-start flex items-center gap-2 text-primary-500" href={'/'}>
          <BsArrowLeft size={'24px'} />
          <span>RETURN</span>
        </Link>

        <div className="h-full flex flex-col items-center justify-center">
          <Image src="/pandasia-logo.svg" alt="Pandasia Logo" width={180} height={180} priority />
          <span className="text-primary-500">BY GOGOPOOL</span>
        </div>
      </section>
      <section
        className={`p-6 flex flex-col gap-2 w-full justify-center min-h-screen bg-primary-500`}
      >
        <div className="flex flex-col gap-2 p-12">
          <CustomConnectButton />
          <div className="flex font-semibold justify-between text-black items-center border-b border-black">
            <span className="text-2xl">S I G N</span>
          </div>
          <span className="text-black font-semibold tracking-[4px]">STEPS TO COMPLETE</span>
          <ol className="text-black">
            <li className="flex gap-2">
              <span>1.</span>
              <span>
                Go to{' '}
                <a className="font-bold" href="https://wallet.avax.network" target="_blank">
                  wallet.avax.network
                </a>{' '}
                and access your wallet
              </span>
            </li>
            <li className="flex gap-2">
              <span>2.</span>
              <span>
                Select the Advanced tab. Copy your P-Chain address and paste it in the Address Field
                under the Sign Message column.
              </span>
            </li>

            <li className="flex gap-2">
              <span>3.</span>
              <span>
                Copy your C-Chain address and paste it in the Message box, and click Sign Message.
              </span>
            </li>
            <li className="flex gap-2">
              <span>4.</span>
              <span>Copy your signature string, and paste it in the Signature input below.</span>
            </li>
          </ol>
          <label>Signature</label>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value.trim())}
            className="resize-none p-4 text-secondary-800"
            placeholder="Signature"
          />
          <span className="text-red-800">{sigError}</span>
          <Button onClick={submitSignature}>Submit Sig</Button>
        </div>
      </section>
    </main>
  );
}
