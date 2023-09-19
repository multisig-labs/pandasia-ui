import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import RegisterButton from '@/components/ui/Button/RegisterButton';
import { anvil } from '@/config/chains';
import Pandasia from '@/contracts/Pandasia';
import { TreeData } from '@/types/pandasia';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { setPriority } from 'os';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { createPublicClient, http } from 'viem';

async function getTreeData() {
  const { data: rootNodes } = await axios.get('http://localhost:8000/trees');
  return rootNodes;
}

const customTransport = http('http://localhost:9650');

const client = createPublicClient({
  chain: anvil,
  transport: customTransport,
});

export default function Register() {
  const [pChain, setPChain] = useState('');
  const [signature, setSignature] = useState('');
  const [proof, setProof] = useState(null);

  const { data: rootNodes, isLoading: rootNodesLoading } = useQuery('root-nodes', getTreeData);

  if (rootNodesLoading) {
    return null;
  }

  console.log(rootNodes);

  const submitSignature = async () => {
    const proof = await axios.get(
      `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
    );

    setProof(proof.data);
  };

  console.log(proof);

  // console.log(proofDataLoading)

  // if (proofDataLoading) {
  //   return null;
  // }

  // const test = async () => {
  //   const p2c = await client.readContract({
  //     address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
  //     abi: Pandasia,
  //     functionName: 'p2c',
  //     args: ['0x424328bf10cdaeeda6bb05a78cff90a0bea12c02'],
  //   });
  //   console.log('p2c', p2c);

  //   const verify = await client.readContract({
  //     address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
  //     abi: Pandasia,
  //     functionName: 'verify',
  //     args: [proofData.Root, '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', proofData.Proof],
  //   });
  //   console.log('verify', verify);
  // };

  /*
      Test signature 24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx
      P-addr P-avax1gfpj30csekhwmf4mqkncelus5zl2ztqzvv7aww
      hex    0x424328bf10cdaeeda6bb05a78cff90a0bea12c02
  */

  return (
    <main className="flex">
      <section className={`p-6 flex flex-col w-full items-center min-h-screen bg-secondary-800`}>
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
          <label>P-Chain Address</label>
          <textarea
            value={pChain}
            onChange={(e) => setPChain(e.target.value)}
            className="resize-none p-4 text-secondary-800"
            placeholder="P-Chain Address"
          />
          <label>Signature</label>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="resize-none p-4 text-secondary-800"
            placeholder="Signature"
          />
          {/*
          <Button onClick={test}>Test</Button>
          <RegisterButton treeData={proofData} />
          */}
          <Button onClick={submitSignature}>Submit Sig</Button>
          <Button>Go To Claim Page</Button>
        </div>
      </section>
    </main>
  );
}
