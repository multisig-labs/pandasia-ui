import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { anvil } from './chains';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient } = configureChains([anvil], [publicProvider()]);

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
