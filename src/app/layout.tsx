'use client';

import MainProvider from '@/providers/Main.provider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Import Head from next/head
import '../app/globals.css';
import '../scss/defaults.scss';
import '../scss/material-theme.scss';
import '../scss/mixins.scss';
import '../scss/open-color.scss';
import '../scss/typography.scss';
import '../scss/variables.scss';
import theme from '../theme/theme'; // Ensure this is a client-side import
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Meta viewport tag for responsive scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#6a5ace" />
      </Head>
      <body className={inter.className}>
        <Providers>
          <MainProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline ensures MUI's styles are applied */}
              <CssBaseline />
              {children}
            </ThemeProvider>
          </MainProvider>
        </Providers>
      </body>
    </html>
  );
}
