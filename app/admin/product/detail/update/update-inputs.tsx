import { Box, NumberInput, Textarea } from "@mantine/core";

import { TextInput } from "@mantine/core";

function UpdateInputs({ inputs, setInputs }: { inputs: any, setInputs: any }) {
   return (
      <Box>
         <TextInput
            label="Ürün Adı"
            placeholder="Ürün Adı"
            rightSectionPointerEvents="all"
            value={inputs.name}
            name="name"
            id="name"
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            mt="md"
         />
         <NumberInput
            label="Ürün Fiyatı"
            placeholder="Ürün Fiyatı"
            rightSectionPointerEvents="all"
            mt="md"
            name="price"
            value={inputs.price}
            onChange={(value) => setInputs({ ...inputs, price: Number(value) })}
         />

         <NumberInput
            label="Ürün Stok Adedi"
            placeholder="Ürün Stok Adedi"
            rightSectionPointerEvents="all"
            mt="md"
            name="stock"
            value={inputs.stock}
            onChange={(value) => setInputs({ ...inputs, stock: Number(value) })}
         />

         <Textarea
            mt="md"
            label="Ürün Açıklaması"
            minRows={4}
            placeholder="Ürün Açıklaması"
            autosize
            name="descrip"
            value={inputs.descrip}
            onChange={(e) => setInputs({ ...inputs, descrip: e.target.value })}
         />
      </Box>
   )
}

export default UpdateInputs;