import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { colors } from '@/styles/theme/colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { chains, wagmiConfig } from '@/config/wagmi';

const montserrat = Montserrat({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
