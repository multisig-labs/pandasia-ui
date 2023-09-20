import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import { forky } from '@/config/chains';
import { publicClient } from '@/config/viem';
import Pandasia from '@/contracts/Pandasia';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { createPublicClient, createWalletClient, custom, http } from 'viem';

async function getTreeData() {
  const { data: rootNodes } = await axios.get('http://localhost:8000/trees');
  return rootNodes;
}

let walletClient;
if (typeof window !== 'undefined') {
  walletClient = createWalletClient({
    chain: forky,
    transport: custom(window.ethereum),
  });
}

export default function Register() {
  console.log(walletClient);

  const [pChain, setPChain] = useState('');
  const [signature, setSignature] = useState('');

  const { data: rootNodes, isLoading: rootNodesLoading } = useQuery('root-nodes', getTreeData);
  if (rootNodesLoading) {
    return null;
  }

  const submitSignature = async () => {
    // Given the signature, we can recover the pChain address, so the user actually only needs
    // a signature. Maybe try hitting the contract with the signature to recover P-Chain addr
    try {
      const { data: proof } = await axios.get(
        `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
      );
      if (proof === undefined) return;

      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(account);

      console.log(walletClient);
      // const [address] = await walletClient.getAddresses();

      const { request } = await publicClient.simulateContract({
        account: address,
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'registerPChainAddr',
        args: [parseInt(proof.SigV, 16), proof.SigR, proof.SigS, proof.Proof],
      });
      console.log(request);

      const txnHash = await walletClient.writeContract(request);
      console.log({ txnHash });

      const transaction = await publicClient.waitForTransactionReceipt({ hash: txnHash });
      console.log('TRANSCACTION', transaction);
    } catch (err) {
      console.warn(err);
    }
  };

  const test = async () => {
    try {
      const { data: proof } = await axios.get(
        `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
      );

      if (proof === undefined) return;
      const p2c = await publicClient.readContract({
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'p2c',
        args: ['0x424328bf10cdaeeda6bb05a78cff90a0bea12c02'],
      });
      console.log('p2c', p2c);

      const c2p = await publicClient.readContract({
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'c2p',
        args: [p2c],
      });
      console.log('c2p', c2p);

      const verify = await publicClient.readContract({
        address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
        abi: Pandasia,
        functionName: 'verify',
        args: [proof.Root, '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', proof.Proof],
      });
      console.log('verify', verify);
    } catch (err) {
      console.warn(err);
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
          <Image src="/pandasia-logo.svg" alt="Next.js Logo" width={180} height={180} priority />
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
          <span className="text-black">
            Please Input your P-Chain Address and Signature by following the steps below.
          </span>
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
              <span>Copy your P-Chain string, and paste it in P-Chain Address input below.</span>
            </li>
            <li className="flex gap-2">
              <span>5.</span>
              <span>Copy your signature string, and paste it in the Signature input below.</span>
            </li>
          </ol>
          <label>P-Chain Address</label>
          <textarea
            value={pChain}
            onChange={(e) => setPChain(e.target.value.trim())}
            className="resize-none p-4 text-secondary-800"
            placeholder="P-Chain Address"
          />
          <label>Signature</label>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value.trim())}
            className="resize-none p-4 text-secondary-800"
            placeholder="Signature"
          />
          <Button onClick={test}>Test</Button>
          <Button onClick={submitSignature}>Submit Sig</Button>
        </div>
      </section>
    </main>
  );
}
