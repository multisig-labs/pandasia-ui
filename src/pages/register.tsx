import { getProof, getSig, getTreeData } from '@/async_fns/pandasia';
import HalfScreenLogo from '@/components/Pages/HalfScreenLogo';
import SignatureStep from '@/components/Pages/Register/SignatureStep';
import SuccessStep from '@/components/Pages/Register/SuccessStep';
import { returnErrString } from '@/config/axios';
import { publicClient, walletClient } from '@/config/viem';
import Pandasia from '@/contracts/Pandasia';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionReceipt } from 'viem';

export default function Register() {
  const [signature, setSignature] = useState('');
  const [sigError, setSigError] = useState('');
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);

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
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
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
      const txn = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      setTransaction(txn);
      setSigError('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = returnErrString(err);
        console.warn(err);
        setSigError(error);
        setTransaction(null);
      } else {
        setTransaction(null);
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
  );
}
