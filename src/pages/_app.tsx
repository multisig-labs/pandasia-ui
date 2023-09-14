import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { colors } from '@/styles/theme/colors';

const { chains, publicClient } = configureChains([avalanche], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Pandasia',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: colors.secondary['300'],
          accentColorForeground: colors.secondary['800'],
          borderRadius: 'none',
        })}
        chains={chains}
      >
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
