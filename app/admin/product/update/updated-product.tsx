import { Products } from "@/app/types/product/ListProduct";
import {  Button, Modal, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {  useEffect } from "react";
import { useFormState } from "react-dom";
import UpdateInputs from "./update-inputs";
import { notifications } from "@mantine/notifications";
import UpdateProductImages from "./product-images";
import { useProductStore } from "../store/product-store";

const initialState = {
   message: '',
   id: '',
};

function UpdatedProduct({ close2, data }: { close2: () => void, data: Products }) {
   const { updateProduct } = useProductStore();
   const [opened, { open, close }] = useDisclosure(false);
   const [state, formAction] = useFormState(updateProduct, initialState);
   useEffect(() => {
      if (state.message === 'Ürün başarıyla güncellendi') {
         notifications.show({
            title: 'Başarılı',
            message: state.message,
            color: 'green',
         });
         close();
      } else if (state.message) {
         notifications.show({
            title: 'Hata',
            message: state.message,
            color: 'red',
         });
      }
   }, [state]);

   return (<>
      <Button
         onClick={open}
         variant="gradient"
         gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
      >Ürünü Düzenle</Button>

      <Modal opened={opened} onClose={close} size="xl" title="Ürünü Düzenle" centered>
         <form action={formAction} encType="multipart/form-data">
            <input type="hidden" name="id" value={data.id} />
            <UpdateInputs data={data} state={state} />
            <UpdateProductImages defaultImage={data.image1} />
            
            <Group style={{ justifyContent: 'space-between' }}>
               <Button mt="md" variant="default" onClick={close}>
                  İptal Et
               </Button>
               <Button 
                  onClick={() => {
                     close();
                     close2();
                  }}
                  mt="md" 
                  variant="gradient" 
                  type="submit" 
                  gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
               >
                  Güncelle
               </Button>
            </Group>
         </form>
      </Modal>
   </>)
}


export default UpdatedProduct;