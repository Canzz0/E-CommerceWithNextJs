import { Button } from "@mantine/core";
import { useCategoryStore } from "../store/category-store";

function DeleteCategory({ id, close }: { id: string, close: () => void }) {
   const { deleteCategory } = useCategoryStore();

   const handleDelete = () => {
      deleteCategory(id);
      close();
   }
   return (
      <Button onClick={handleDelete} variant="gradient" gradient={{ from: 'red', to: 'pink', deg: 78 }}>Kategori Sil</Button>
   );
}
export default DeleteCategory;