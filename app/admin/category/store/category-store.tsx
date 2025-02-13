import { GetCategoryList } from "@/app/actions/category/GET/getCategoryList";
import { addcategory } from "@/app/admin/category/actions/POST/addcategoryproduction";
import { deletecategory } from "@/app/admin/category/actions/POST/deletecategoryproduction";
import { updatecategory } from "@/app/admin/category/actions/POST/updatecategoryproduction";
import { toast } from "sonner";
import { create } from "zustand";
interface CategoryStore {
   category: any[];
   setCategory: (category: any) => void;
   getCategory: () => Promise<void>;
   addCategory: (prevState: any, category: any) => Promise<any>;
   updateCategory: (prevState: any, category: any) => Promise<any>;
   deleteCategory: (formData: any) => Promise<any>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
   category: [],
   setCategory: (category: any) => set({ category }),

   getCategory: async () => {
      const res = await GetCategoryList();
      set({ category: res });
   },

   addCategory: async (prevState: any, category: any) => {
      const loadingToast = toast.loading('Kategori Ekleniyor');
      const res = await addcategory(prevState, category);
      if (res.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message)
         // Refresh the category list after successful addition
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      } else {
         toast.dismiss(loadingToast);
         toast.error(res?.message)
      }
      return res;
   },

   updateCategory: async (prevState: any, category: any) => {
      const loadingToast = toast.loading('Kategori Güncelleniyor');
      const res = await updatecategory(prevState, category);
      if (res.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message)
         prevState.name = category.name
         // Refresh the category list after successful update
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      } else {
         toast.dismiss(loadingToast);
         toast.error(res?.message)
      }
      return res;
   },

   deleteCategory: async (id: string) => {
      const loadingToast = toast.loading('Kategori Siliniyor');

      const res = await deletecategory(id);
      if (res.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message)
         // Refresh the category list after successful deletion
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      } else {
         toast.dismiss(loadingToast);
         toast.error(res?.message)
      }
      return res;
   }
}));
