import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { avalanche, forky } from './chainsConfig';

// -- Production --
// export const { chains, publicClient } = configureChains([avalanche], [publicProvider()]);

// -- Local Testing --
export const { chains, publicClient } = configureChains([forky], [publicProvider()]);

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
