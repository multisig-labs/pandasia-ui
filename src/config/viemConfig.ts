import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { avalanche } from './chainsConfig';

const customTransport = http('https://api.avax.network/ext/bc/C/rpc');
export const publicClient = createPublicClient({
  chain: avalanche,
  transport: customTransport,
});

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
  if (typeof window.ethereum !== 'undefined') {
    walletClient = createWalletClient({
      chain: avalanche,
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
      transport: custom(window.ethereum),
    });
  }
}
