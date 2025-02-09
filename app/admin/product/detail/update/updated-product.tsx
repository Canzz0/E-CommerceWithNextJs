import { updateproduct } from "@/app/actions/product/POST/uptadeproduct";
import { Products } from "@/app/types/product/ListProduct";
import { Box, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useFormState } from "react-dom";
import UpdateInputs from "./update-inputs";

const initialState = {
   message: '',
   id: '',
};

function UpdatedProduct({ close2, data }: { close2: () => void, data: Products }) {
   const [opened, { open, close }] = useDisclosure(false);
   const [image, setImage] = useState<string | null>(null);
   const [state, formAction] = useFormState(updateproduct, initialState);

   const [inputs, setInputs] = useState({
      name: data.name,
      price: data.price,
      stock: data.stock,
      descrip: data.descrip,
   });

   const handleNewImage = () => {
      const confirmed = window.confirm("Mevcut resmi silmek istediğinizden emin misiniz?");
      if (confirmed) {
         setImage(null);
         const fileInput = document.createElement('input');
         fileInput.type = 'file';
         fileInput.accept = 'image/*';
         fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
               const imageUrl = URL.createObjectURL(file);
               setImage(imageUrl);
            }
         };
         fileInput.click();
      }
   };

   const handleUpdate = (formData: FormData) => {
      // Mevcut form verilerini temizle
      Array.from(formData.keys()).forEach(key => {
         formData.delete(key);
      });

      // Yeni verileri ekles
      if (image) {
         formData.append("image1", image);
      } else {
         formData.append("image1", data.image1);
      }
      formData.append("name", inputs.name);
      formData.append("price", inputs.price.toString());
      formData.append("stock", inputs.stock.toString());
      formData.append("descrip", inputs.descrip);
      formData.append("id", data.id.toString());
      close2()
      close()
   }

   return (<>
      <Button
         onClick={open}
         variant="gradient"
         gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
      >Ürünü Düzenle</Button>

      <Modal opened={opened} onClose={close} size="xl" title="Ürünü Düzenle" centered>
         <form action={async (formData: FormData) => {
            handleUpdate(formData);
            await formAction(formData);
         }}>
            <UpdateInputs inputs={inputs} setInputs={setInputs} />
            <Button
               mt="md"
               variant="gradient"
               gradient={{ from: 'yellow', to: 'orange', deg: 78 }}
               onClick={handleNewImage}
            >Yeni Resim Ekle</Button>
            <Box mt="md" style={{ width: '30%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
               <img
                  src={image || `${data.image1}`}
                  style={{
                     width: '100%',
                     height: '100%',
                     objectFit: 'contain',
                  }}
               />
            </Box>
            <Button mt="md" variant="gradient" type="submit" gradient={{ from: 'yellow', to: 'orange', deg: 78 }}>Güncelle</Button>
            <Box>
            </Box>
         </form>
      </Modal>
   </>)
}


export default UpdatedProduct;