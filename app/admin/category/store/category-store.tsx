import { GetCategoryList } from "@/app/actions/category/GET/getCategoryList";
import { addcategory } from "@/app/actions/category/POST/addcategoryproduction";
import { deletecategory } from "@/app/actions/category/POST/deletecategoryproduction";
import { updatecategory } from "@/app/actions/category/POST/updatecategoryproduction";
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
      const res = await addcategory(prevState, category);
      if (res.message) {
         // Refresh the category list after successful addition
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      }
      return res;
   },

   updateCategory: async (prevState: any, category: any) => {
      const res = await updatecategory(prevState, category);
      if (res.status) {
         prevState.name = category.name
         // Refresh the category list after successful update
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      }
      return res;
   },

   deleteCategory: async (id: string) => {
      const res = await deletecategory(id);
      if (res.message) {
         // Refresh the category list after successful deletion
         const updatedCategories = await GetCategoryList();
         set({ category: updatedCategories });
      }
      return res;
   }
}));
