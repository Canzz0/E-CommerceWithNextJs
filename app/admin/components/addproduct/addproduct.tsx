'use client';
import { Button, Modal, Group} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddproductInputs from './components/AddproductInputs';
import {  useState, useEffect } from 'react';
import AddProductImages from './components/AddProductImages';
import { ProductInputs } from '@/app/types/product/AddProduct';
import { useFormState } from 'react-dom';
import { addproduct } from '@/app/actions/product/POST/addproduct';
import { notifications } from '@mantine/notifications';
import { useProductStore } from '../../product/store/product-store';

const initialState = {
  message: '',
  id: '',
};

const AddProduct = () => {
  const { addProduct } = useProductStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [state, formAction] = useFormState(addProduct, initialState);

  const [inputs, setInputs] = useState<ProductInputs>({
    name: '',
    price: 0,
    descrip: '',
    stock: 0,
  });

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (state.message === 'Ürün başarıyla eklendi') {
      notifications.show({
        title: 'Başarılı',
        message: state.message,
        color: 'green',
      });
      handleClose();
    } else if (state.message) {
      notifications.show({
        title: 'Hata',
        message: state.message,
        color: 'red',
      });
    }
  }, [state]);

  const handleClose = () => {
    // Modal kapanırken resimleri sıfırla
    setImages([]);
    close();
  };

  const handleSubmit = async (formData: FormData) => {
    // Input değerlerini FormData'ya ekle
    formData.append('name', inputs.name);
    formData.append('price', inputs.price.toString());
    formData.append('descrip', inputs.descrip);
    formData.append('stock', inputs.stock.toString());
    
    // Resimleri FormData'ya ekle
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });
    
    return formAction(formData);
  };

  return (
    <>
      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
      >
        Ürün Ekleme
      </Button>
     
     

      <Modal opened={opened} onClose={handleClose} size="xl" title="Ürün Ekleme" centered>
        <form action={handleSubmit}>
          <AddproductInputs inputs={inputs} setInputs={setInputs} />
          <AddProductImages setImages={setImages} images={images} />

          <Group style={{ justifyContent: 'space-between' }}>
            <Button mt="md" variant="default">
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
