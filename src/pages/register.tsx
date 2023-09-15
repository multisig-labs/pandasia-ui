import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import Pandasia from '@/contracts/Pandasia';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';
import {
  useContractRead,
  useNetwork,
  usePrepareContractWrite,
  useQueryClient as useWagmiClient,
} from 'wagmi';
import { getAccount, getContract } from 'wagmi/actions';

async function getTrees() {
  const response = await axios.get('http://localhost:8000/trees');
  return response.data;
}

export default function Register() {
  const [pChain, setPChain] = useState('');
  const [signature, setSignature] = useState('');
  //TODO: Get address from .env in ../pandasia need to figure out how to get this dynamically later

  // TODO NEXT: Figure out how to write to contract with viem
  // const customTransport = http(process.env.API_RPC_ENDPOINT)

  // const client = createPublicClient({
  //   chain: avalanche,
  //   transport: customTransport,
  // })

  const otherThing = useContractRead({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'stakingContract',
  });

  const { data: rootNodes } = useQuery('trees', getTrees);
  async function submitStuff() {
    try {
      const res = await axios.get(
        `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
      );
      // console.log(res)
    } catch (err) {
      // console.log(err.response.data.message)
    }
  }

  function submitSignature() {
    /*
      call to localhost:8000 (is the pandasia server the go code)
      
      1. get root from localhost:8000/trees
      2. get the p-chain address from user input and convert to hex
      3. get the signature to verify from user
      4. get the proof from localhost:8000/proof = `${pandasiaUrl}/proof/${root}?addr=${addrToRegister}&sig=${sigToVerify}`
      5. once we have the proof, we pass to the smart contract register using wagmi hooks to blockchain
        5a. pandasia::registerPChainAddr(proof.SigV, proof.SigR, proof.SigS, proof.Proof) This is in solidity
      
      6. returns nothing (maybe wagmi returns status:200 code??) or
         "0x3d5607fc": "PAddrNotInValidatorMerkleTree()"
         "0x21ea10f8": "PAddrAlreadyRegistered()"
     
      Test signature 24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx
      P-addr P-avax1gfpj30csekhwmf4mqkncelus5zl2ztqzvv7aww
      hex    0x424328bf10cdaeeda6bb05a78cff90a0bea12c02
    */
  }

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
          <Button onClick={submitStuff}>Submit Stuff</Button>
          <Button>Go To Claim Page</Button>
        </div>
      </section>
    </main>
  );
}
