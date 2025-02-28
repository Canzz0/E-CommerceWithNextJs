'use client';

import { Table } from '@mantine/core';
import { useEffect } from 'react';
import { useProductStore } from './store/product-store';

export function ProductList({ open, setId }: any) {

  const { product, getProduct } = useProductStore()
  useEffect(() => {
    getProduct()
  }, [])
  const handleClick = (id: number | string): void => {
    open()
    setId(id)
  }


  const rows = product.map((product) => (
    <Table.Tr onClick={() => handleClick(product.id)} style={{ cursor: 'pointer' }} key={product.id}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
      <Table.Td>{product.stock}</Table.Td>
      <Table.Td>{product.descrip}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing={'xl'} withTableBorder highlightOnHover stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Ürün Adı</Table.Th>
          <Table.Th>Ürün Fiyatı</Table.Th>
          <Table.Th>Ürün Stock Durumu</Table.Th>
          <Table.Th>Ürün Açıklaması</Table.Th>

        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Ürün Listeniz</Table.Caption>
    </Table>
  );
}
