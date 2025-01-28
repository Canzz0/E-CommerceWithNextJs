'use client';
import { Box, Button, TextInput } from '@mantine/core';
import { useFormState } from 'react-dom';
import DeleteCategory from '../deletecategory/deletecategory';
import { useCategoryStore } from '../store/category-store';

const initialState = {
  message: '',
};
const UpdateCategory = ({ data, close }: any) => {
  const { updateCategory } = useCategoryStore();
  const [state, formAction] = useFormState(updateCategory, initialState);
  return (
    <form action={formAction}>
      <TextInput value={data.id} id="id" name="id" label="Kategori Id" readOnly />
      <TextInput
        defaultValue={data.name}
        id="name"
        name="name"
        label="Kategori Adı"
        placeholder="pantolon"
        required
      />
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: '1rem',
        width: '100%',
        marginTop: '1rem'
      }} >
        <DeleteCategory close={close} id={data.id} />
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
          onClick={close}
        >
          Kategori Güncelle
        </Button>
      </Box>
    </form>
  );
};

export default UpdateCategory;
