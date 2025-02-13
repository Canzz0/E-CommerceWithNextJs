import { Products } from "@/app/types/product/ListProduct";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useFormState } from "react-dom";
import { useProductStore } from "../../store/product-store";
import UpdateProductImages from "../../update/product-images";
import UpdateInputs from "../../update/update-inputs";


const initialState = {
   message: '',
   id: '',
};

function UpdatedProduct({ close2, data }: { close2: () => void, data: Products }) {
   const { updateProduct } = useProductStore();
   const [opened, { open, close }] = useDisclosure(false);
   const [state, formAction] = useFormState(updateProduct, initialState);


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