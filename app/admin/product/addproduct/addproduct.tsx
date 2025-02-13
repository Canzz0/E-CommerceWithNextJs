'use client';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormState } from 'react-dom';
import { useProductStore } from '../store/product-store';
import AddProductImages from './components/AddProductImages';
import AddproductInputs from './components/AddproductInputs';

const initialState = {
  message: '',
  id: '',
};

const AddProduct = () => {
  const { addProduct } = useProductStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [state, formAction] = useFormState(addProduct, initialState);


  return (
    <>
      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
      >
        Ürün Ekleme
      </Button>

      <Modal opened={opened} onClose={close} size="xl" title="Ürün Ekleme" centered>
        <form action={formAction} encType="multipart/form-data">
          <AddproductInputs />
          <AddProductImages />

          <Group style={{ justifyContent: 'space-between' }}>
            <Button mt="md" variant="default" onClick={close}>
              İptal Et
            </Button>
            <Button
              mt="md"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
              type="submit"
            >
              Kaydet
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
