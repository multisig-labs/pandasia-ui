import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { avalanche, forky } from './chainsConfig';

const customTransport = http(process.env.NEXT_PUBLIC_RPC);

// -- Production --
export const publicClient = createPublicClient({
  chain: avalanche,
  transport: customTransport,
});

// -- Local Testing --
// export const publicClient = createPublicClient({
//   chain: forky,
//   transport: customTransport,
// });

export let walletClient: WalletClient;
if (typeof window !== 'undefined') {
  //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
  if (typeof window.ethereum !== 'undefined') {
    // -- Production --
    //walletClient = createWalletClient({
    //  chain: avalanche,
    //  //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
    //  transport: custom(window.ethereum),
    //});
    // -- Local Testing --
    walletClient = createWalletClient({
      chain: forky,
      //@ts-ignore -- the ethereum property is not on the default window object, added by wallet extensions.
      transport: custom(window.ethereum),
    });
  }
}
