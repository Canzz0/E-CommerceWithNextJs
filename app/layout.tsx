import CustomHeader from '@/components/CustomHeader/CustomHeader';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { theme } from '../theme';
import classes from './global.module.css';
export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            <CustomHeader>
              {children}
              <Toaster toastOptions={{
                closeButton: true,
                duration: 3000,
                className: classes.toast,
              }} />

            </CustomHeader>
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
