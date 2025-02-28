"use client"
import CategorySelect from "@/app/admin/category/category-select";
import { ProductInputs } from "@/app/types/product/AddProduct";
import { NumberInput, Textarea, TextInput } from "@mantine/core";

const AddproductInputs = () => {
  return (
    <>
      <CategorySelect  name="category_id" id="category_id" mt="md"/>
      <TextInput
        label="Ürün Adı"
        placeholder="Ürün Adı"
        rightSectionPointerEvents="all"
        name="name"
        id="name"
        mt="md"
      />
      <NumberInput
        label="Ürün Fiyatı"
        placeholder="Ürün Fiyatı"
        rightSectionPointerEvents="all"
        mt="md"
        name="price"
      />

      <NumberInput
        label="Ürün Stok Adedi"
        placeholder="Ürün Stok Adedi"
        rightSectionPointerEvents="all"
        mt="md"
        name="stock"

      />


      <Textarea
        mt="md"
        label="Ürün Açıklaması"
        minRows={4}
        placeholder="Ürün Açıklaması"
        autosize
        name="descrip"
      />
    </>
  );
};

export default AddproductInputs;
