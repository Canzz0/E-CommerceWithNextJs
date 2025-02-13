'use client';
import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import AdminLogin from '../AdminLogin/AdminLogin';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" w="100%">
          <Group justify="flex-start" h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Anasayfa
            </Link>
            <Link href="/product" className={classes.link}>
              Ürün Listesi
            </Link>

            <Link href="/info" className={classes.link}>
              Hakkımızda
            </Link>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

          <Group justify="flex-end" h="100%">
            <ColorSchemeToggle />
            <AdminLogin />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Saat Endüstrisi"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea mx="-md">
          <Divider my="sm" />
          <Link onClick={closeDrawer} href="/" className={classes.subLink}>
            Anasayfa
          </Link>
          <Link onClick={closeDrawer} href="/product" className={classes.subLink}>
            Ürün Listesi
          </Link>

          <Link onClick={closeDrawer} href="/info" className={classes.subLink}>
            Hakkımızda
          </Link>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
