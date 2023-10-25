import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { colors } from '@/styles/theme/colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { chains, wagmiConfig } from '@/config/wagmiConfig';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence } from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
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
              <AnimatePresence mode="wait">
                <Component {...pageProps} />
              </AnimatePresence>
            </main>
          </RainbowKitProvider>
        </WagmiConfig>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
