import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { avalanche, forky, fuji } from './chainsConfig';

const productionChains = [avalanche];
const localChains = [forky];
const testChains = [fuji];

let chainsToUse = productionChains;

if (process.env.NEXT_PUBLIC_ENV == 'PRODUCTION') {
  chainsToUse = productionChains;
}
if (process.env.NEXT_PUBLIC_ENV == 'LOCAL') {
  chainsToUse = localChains;
}
if (process.env.NEXT_PUBLIC_ENV == 'TEST') {
  chainsToUse = testChains;
}

export const { chains, publicClient } = configureChains(chainsToUse, [publicProvider()]);

export const { connectors } = getDefaultWallets({
  appName: 'Pandasia',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains,
});
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
