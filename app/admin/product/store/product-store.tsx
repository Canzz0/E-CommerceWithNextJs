import { getProducts } from "@/app/product/actions/GET/getproductList";
import { addproduct } from "@/app/admin/product/actions/POST/addproduct";
import { DeleteProduct } from "@/app/admin/product/actions/POST/deleteproduct";
import { updateproduct } from "@/app/admin/product/actions/POST/uptadeproduct";
import { create } from "zustand";

interface ProductStore {
   product: any[];
   setProduct: (product: any) => void;
   getProduct: () => Promise<void>;
   addProduct: (prevState: any, formData: any) => Promise<any>;
   updateProduct: (prevState: any, formData: any) => Promise<any>;
   deleteProduct: (id: string) => Promise<any>;
   isSuccess?: boolean;
   setIsSuccess?: (isSuccess: boolean) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
   product: [],
   setProduct: (product: any) => set({ product }),
   getProduct: async () => {
      const res = await getProducts();
      set({ product: res })
   },

   addProduct: async (prevState: any, formData: any) => {
      const res = await addproduct(prevState, formData);
      if (res?.message) {
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
      }
      return res;
   },

   updateProduct: async (prevState: any, formData: any) => {
      const res = await updateproduct(prevState, formData);
      if (res?.message) {
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
      }
      return res;
   },
   deleteProduct: async (id: string) => {
      const res = await DeleteProduct(id);
      if (res.message) {
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
         }
      return res;
   }
}))