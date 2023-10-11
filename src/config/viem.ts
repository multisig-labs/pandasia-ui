import { forky } from './chains';
import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';

const customTransport = http('http://localhost:9650');
export const publicClient = createPublicClient({
  chain: forky,
  transport: customTransport,
});

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  walletClient = createWalletClient({
    chain: forky,
    transport: custom(window.ethereum),
  });
}
