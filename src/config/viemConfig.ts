import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { avalanche } from './chainsConfig';

const customTransport = http(
  'https://nd-058-850-167.p2pify.com/4e4706b8fc3a3bb4a5559c84671a1cf4/ext/bc/C/rpc',
);
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
