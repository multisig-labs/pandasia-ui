import { getProof, getSig, getTreeData } from '@/async_fns/backendCalls';
import { recoverMessage, registerPChainAdrr } from '@/async_fns/viemAsync';
import { useGetMerkleRoot } from '@/async_fns/wagmiHooks';
import HalfScreenLogo from '@/components/Pages/HalfScreenLogo';
import LayoutAndNavbar from '@/components/Pages/LayoutAndNavbar';
import { FadeTransition } from '@/components/Pages/PageTransitions';
import SignatureStep from '@/components/Pages/Register/SignatureStep';
import SuccessStep from '@/components/Pages/Register/SuccessStep';
import { makeErrorFriendly } from '@/config/axiosConfig';
import { publicClient, walletClient } from '@/config/viemConfig';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionReceipt } from 'viem';

export default function Register() {
  const [signature, setSignature] = useState('');
  const [sigError, setSigError] = useState('');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);

  const { data: trees, isLoading: treesLoading } = useQuery('root-nodes', getTreeData);
  const { data: merkleRoot, isLoading: merkleRootLoading } = useGetMerkleRoot();

  if (treesLoading) {
    return <span>Loading trees</span>;
  }

  if (merkleRootLoading) {
    return <span>Loading merkle root</span>;
  }

  if (trees === undefined) {
    return <span>Error retreiving trees</span>;
  }

  if (merkleRoot === undefined) {
    return <span>Error retreiving merkleRoot</span>;
  }

  let serverContainsRoot = false;
  trees.forEach((tree) => {
    if (tree.Root == merkleRoot) {
      serverContainsRoot = true;
    }
  });

  if (!serverContainsRoot) {
    return <span>Backend does not contain contract root</span>;
  }

  const submitSignature = async () => {
    try {
      setSigError('');
      // Gets SigV, SigR, SigS from a given signature
      const { data: sig } = await getSig(signature);
      if (sig === undefined) {
        console.warn('sig undefined');
        return;
      }
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const pAddr = await recoverMessage(sig, address);

      // Using the merkle root, pChain address, and signature we can obtain a proof that the pChain address is in the merkle tree
      const { data: proof } = await getProof(merkleRoot, pAddr, signature);
      if (proof === undefined) {
        console.warn('proof undefined');
        return;
      }

      const register = await registerPChainAdrr(proof, address);

      // After confirming the pChain address is in the tree, we register the pChain address
      const txnHash = await walletClient.writeContract(register);
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = makeErrorFriendly(err);
        console.warn(err);
        setSigError(error);
        setTransaction(null);
      } else {
        setTransaction(null);
        setSigError(err as string);
        console.warn(err);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center pt-12">
      <Image width={120} height={150} alt="pandasia logo" src={'/favicon.svg'} />
      <span className="pt-4 text-xl text-primary-500">
        <span className="text-red-400">Error 404:&nbsp;</span>
        <span>Page not found.</span>
      </span>
    </div>
  );

  return (
    <FadeTransition>
      <main className="flex">
        <HalfScreenLogo />
        {transaction ? (
          <SuccessStep transaction={transaction} />
        ) : (
          <SignatureStep
            signature={signature}
            setSignature={setSignature}
            submitSignature={submitSignature}
            sigError={sigError}
          />
        )}
      </main>
    </FadeTransition>
  );
}
