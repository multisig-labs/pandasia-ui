import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { forky } from './chainsConfig';

const customTransport = http('http://localhost:9650');
export const publicClient = createPublicClient({
  chain: forky,
  transport: customTransport,
});

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  walletClient = createWalletClient({
    chain: forky,
    //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
    transport: custom(window.ethereum),
  });
}
