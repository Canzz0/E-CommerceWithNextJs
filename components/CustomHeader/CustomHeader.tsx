'use client';
import { AppShell } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';

const CustomHeader: FC<PropsWithChildren> = ({ children }) => {


  return (
    <AppShell
      header={{
        height: 60,
      }}
      footer={{
        height: 70,
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main w={'auto'}  >



        {children}
      </AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default CustomHeader;
