'use client'

import { Button } from '@mantine/core'
import { useProductStore } from '../store/product-store';
interface DeleteProductProps {
  productId: string
  close:()=>void
}

export default function DeleteProduct({ close, productId }: DeleteProductProps) {
const {deleteProduct}=useProductStore();
  const handleDelete = () => {
    deleteProduct(productId)
    close()
  }

  return (
    <Button variant="gradient" gradient={{ from: 'red', to: 'pink', deg: 78 }}
      onClick={handleDelete}
    >
      Ürünü Sil
    </Button>
  )
}
