import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { forky } from './chains';

const customTransport = http('http://localhost:9650');
export const publicClient = createPublicClient({
  chain: forky,
  transport: customTransport,
});

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  walletClient = createWalletClient({
    chain: forky,
    //@ts-ignore
    transport: custom(window.ethereum),
  });
}
