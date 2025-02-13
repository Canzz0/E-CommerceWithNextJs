import { addproduct } from "@/app/admin/product/actions/POST/addproduct";
import { DeleteProduct } from "@/app/admin/product/actions/POST/deleteproduct";
import { updateproduct } from "@/app/admin/product/actions/POST/uptadeproduct";
import { getProducts } from "@/app/product/actions/GET/getproductList";
import { toast } from "sonner";
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
      const loadingToast = toast.loading('Ürün Eklenyor');
      const res = await addproduct(prevState, formData);
      if (res?.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message);
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
      } else {
         toast.dismiss(loadingToast)
         toast.error(res?.message)
      }
      return res;
   },

   updateProduct: async (prevState: any, formData: any) => {
      const loadingToast = toast.loading('Ürün Güncelleniyor');
      const res = await updateproduct(prevState, formData);
      if (res?.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message)
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
      } else {
         toast.dismiss(loadingToast);
         toast.error(res?.message)
      }
      return res;
   },
   deleteProduct: async (id: string) => {
      const loadingToast = toast.loading('Ürün Siliniyor');
      const res = await DeleteProduct(id);
      if (res.status) {
         toast.dismiss(loadingToast);
         toast.success(res.message)
         const updatedProducts = await getProducts();
         set({ product: updatedProducts });
      } else {
         toast.dismiss(loadingToast);
         toast.error(res.message)
      }
      return res;
   }
}))