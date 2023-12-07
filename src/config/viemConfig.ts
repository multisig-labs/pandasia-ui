import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { avalanche, forky, fuji } from './chainsConfig';
import { PublicClient } from 'wagmi';

const customTransport = http(process.env.NEXT_PUBLIC_RPC);

export let publicClient: PublicClient;

if (process.env.NEXT_PUBLIC_ENV == 'PRODUCTION') {
  publicClient = createPublicClient({
    chain: avalanche,
    transport: customTransport,
  });
}

if (process.env.NEXT_PUBLIC_ENV == 'LOCAL') {
  publicClient = createPublicClient({
    chain: forky,
    transport: customTransport,
  });
}

if (process.env.NEXT_PUBLIC_ENV == 'TEST') {
  publicClient = createPublicClient({
    chain: fuji,
    transport: customTransport,
  });
}

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
  if (typeof window.ethereum !== 'undefined') {
    if (process.env.NEXT_PUBLIC_ENV == 'PRODUCTION') {
      walletClient = createWalletClient({
        chain: avalanche,
        //@ts-ignore
        transport: custom(window.ethereum),
      });
    }
    if (process.env.NEXT_PUBLIC_ENV == 'LOCAL') {
      walletClient = createWalletClient({
        chain: forky,
        //@ts-ignore
        transport: custom(window.ethereum),
      });
    }
    if (process.env.NEXT_PUBLIC_ENV == 'TEST') {
      walletClient = createWalletClient({
        chain: fuji,
        //@ts-ignore
        transport: custom(window.ethereum),
      });
    }
  }
}
