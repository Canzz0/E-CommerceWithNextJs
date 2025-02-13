'use client';
import { DoubleNavbar } from '@/components/Navbar/Navbar';
import { Box, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './adminpage.module.css';
import AddProduct from './product/addproduct/addproduct';
import ProductPreview from './product/detail/productpreview';
import { ProductList } from './product/productlist';
const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [id, setId] = useState('');

  return (
    <Box display={'flex'}>
      <DoubleNavbar />
      <Box display={'content'} w={'90%'} p={14}>

        <Box className={classes.titleplace}>
          <Title order={3} size="h1">
            Ürün Listesi
          </Title>
          <AddProduct />
        </Box>
        <ProductList setId={setId} open={open} />
        <Modal opened={opened} size="xl" title="Ürün Önizleme" centered onClose={close}>
          <ProductPreview close={close} id={id} />
        </Modal>
      </Box>
    </Box>
  );
};

export default Page;
