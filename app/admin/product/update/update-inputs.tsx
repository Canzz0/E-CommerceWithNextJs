import { Box, NumberInput, Textarea } from "@mantine/core";

import { TextInput } from "@mantine/core";
import CategorySelect from "../../category/category-select";

function UpdateInputs({ data, state }: { data: any, state: any }) {
   return (
      <Box>
          <CategorySelect name="categoryId" id="categoryId" mt="md" defaultValue={data.categoryId} />
         <TextInput
            label="Ürün Adı"
            placeholder="Ürün Adı"
            rightSectionPointerEvents="all"
            name="name"
            id="name"
            defaultValue={data.name}
            mt="md"
         />
         <NumberInput
            label="Ürün Fiyatı"
            placeholder="Ürün Fiyatı"
            rightSectionPointerEvents="all"
            mt="md"
            name="price"
            defaultValue={data.price}

         />

         <NumberInput
            label="Ürün Stok Adedi"
            placeholder="Ürün Stok Adedi"
            rightSectionPointerEvents="all"
            mt="md"
            name="stock"
            defaultValue={data.stock}
         />
        
         <Textarea
            mt="md"
            label="Ürün Açıklaması"
            minRows={4}
            placeholder="Ürün Açıklaması"
            autosize
            name="descrip"
            defaultValue={data.descrip}
         />
      </Box>
   )
}

export default UpdateInputs;