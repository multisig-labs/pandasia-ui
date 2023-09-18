import Button from '@/components/ui/Button/Button';
import { CustomConnectButton } from '@/components/ui/Button/CustomConnectButton';
import { anvil } from '@/config/chains';
import { publicClient } from '@/config/wagmi';
import Pandasia from '@/contracts/Pandasia';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useQueryClient as useWagmiClient,
} from 'wagmi';
import { getAccount, getContract } from 'wagmi/actions';

async function getTrees() {
  const response = await axios.get('http://localhost:8000/trees');
  return response.data;
}

const customTransport = http('http://localhost:9650');

export default function Register() {
  const [pChain, setPChain] = useState('0x424328bf10cdaeeda6bb05a78cff90a0bea12c02');
  const [signature, setSignature] = useState(
    '24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx',
  );
  const [tData, setTData] = useState<{
    SigV: string;
    SigR: `0x{string}`;
    SigS: `0x{string}`;
    Proof: `0x{string}`[];
  }>({
    SigV: '0',
    SigR: '0x0000000',
    SigS: '0x0',
    Proof: '0x0',
  });

  const client = createPublicClient({
    chain: anvil,
    transport: customTransport,
  });

  const account = useAccount();
  let wallet;
  if (typeof window === 'undefined') {
  } else {
    wallet = createWalletClient({
      chain: anvil,
      account: account.address,
      transport: custom(window.ethereum),
    });
  }
  const { data: rootNodes } = useQuery('trees', getTrees);

  const { config: registerConfig } = usePrepareContractWrite({
    address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    abi: Pandasia,
    functionName: 'registerPChainAddr',
    args: [parseInt(tData.SigV, 16), tData.SigR, tData.SigS, tData.Proof],
  });
  const { write: doIt } = useContractWrite({
    ...registerConfig,
    onSuccess(data) {
      console.log('SUCESESSS', data);
    },
    onError(error) {
      console.log('ERRORRRRRRRRRR NO', error);
    },
  });

  async function loadData() {
    const { data: treedata } = await axios.get(
      `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
    );
    setTData(treedata);
    console.log('treedata', treedata);
  }

  async function betterWrite() {
    console.log('do it', doIt);
    doIt && doIt();
  }

  async function test() {
    const { data: treedata } = await axios.get(
      `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
    );
    setTData(treedata);
    console.log('treedata', treedata);

    const p2c = await client.readContract({
      address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
      abi: Pandasia,
      functionName: 'p2c',
      args: ['0x424328bf10cdaeeda6bb05a78cff90a0bea12c02'],
    });
    console.log('p2c', p2c);

    const verify = await client.readContract({
      address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
      abi: Pandasia,
      functionName: 'verify',
      args: [rootNodes[0].Root, '0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', treedata.Proof],
    });
    console.log('verify', verify);

    // const canClaim = await client.readContract({
    //   address: '0xfD6e7c1b6A8862C9ee2dC338bd11A3FC3c616E34',
    //   abi: Pandasia,
    //   functionName: 'canClaimAirdrop',
    //   args: ['0x424328bf10cdaeeda6bb05a78cff90a0bea12c02', BigInt(1), treedata.Proof],
    // });
    // console.log('canClaim', canClaim);
  }

  async function register() {
    const { data: treedata } = await axios.get(
      `http://localhost:8000/proof/${rootNodes[0].Root}?addr=${pChain}&sig=${signature}`,
    );

    const { request } = await wallet.writeContract({
      account: account.address,
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: Pandasia,
      functionName: 'registerPChainAddr',
      args: [parseInt(treedata.SigV, 16), treedata.SigR, treedata.SigS, treedata.Proof],
    });

    // const writeResult = await wallet.writeContract(request);
    console.log('OKAY DONE NOW HAHA :)', request);
  }

  /*
      Test signature 24eWufzWvm38teEhNQmtE9N5BD12CWUawv1YtbYkuxeS5gGCN6CoZBgU4V4WDrLa5anYyTLGZT8nqiEsqX7hm1k3jofswfx
      P-addr P-avax1gfpj30csekhwmf4mqkncelus5zl2ztqzvv7aww
      hex    0x424328bf10cdaeeda6bb05a78cff90a0bea12c02
  */

  return (
    <main className="flex">
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
          <Button onClick={register}>Submit Stuff</Button>
          <Button onClick={test}>Test</Button>
          <Button onClick={loadData}>load data</Button>
          <Button onClick={betterWrite}>better write</Button>
          <Button>Go To Claim Page</Button>
        </div>
      </section>
    </main>
  );
}
