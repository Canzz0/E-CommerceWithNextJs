'use client';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormState } from 'react-dom';
import { useCategoryStore } from '../store/category-store';

const initialState = {
  message: '',
};
const AddCategory = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { addCategory } = useCategoryStore();
  const [state, formAction] = useFormState(addCategory, initialState);

  return (
    <>

      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
      >

        Kategori Ekle
      </Button>
      <Modal opened={opened} onClose={close} size="xl" title="Ürün Ekleme" centered>
        <form action={formAction}>
          <TextInput id="name" name="name" label="Kategori Adı" placeholder="pantolon" required />

          <Button
            type="submit"
            fullWidth
            mt="xl"
            variant="gradient"
            gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
            onClick={close}
          >
            Kategori Ekle
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddCategory;
