import { useEffect } from "react";
import { useCategoryStore } from "./store/category-store";
import { ComboboxItem, Select } from "@mantine/core";

function CategorySelect({name, id, mt, defaultValue}:any) {
    const { category, getCategory } = useCategoryStore();

    useEffect(() => {
      getCategory();
    }, []);

   
  return (
   <Select
   label="Kategori Seçiniz"
   data={category.map((item) => ({ value: item.id, label: item.name }))}
   name={name}
   id={id}
   mt={mt}
   defaultValue={defaultValue}
   />
  )
}

export default CategorySelect