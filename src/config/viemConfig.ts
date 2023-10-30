import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { forky } from './chainsConfig';

const customTransport = http('http://localhost:9650');
export const publicClient = createPublicClient({
  chain: forky,
  transport: customTransport,
});

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
  if (typeof window.ethereum !== 'undefined') {
    walletClient = createWalletClient({
      chain: forky,
      //@ts-ignore -- same as above ignore
      transport: custom(window.ethereum),
    });
  }
}
