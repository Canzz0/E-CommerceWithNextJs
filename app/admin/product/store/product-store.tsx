import { getProducts } from "@/app/actions/product/GET/getproductList";
import { create } from "zustand";

interface ProductStore {
   product: any[];
   setProduct: (product: any) => void;
   getProduct: () => Promise<void>;

}

export const useProductStore = create<ProductStore>((set) => ({
   product: [],
   setProduct: (product: any) => set({ product }),
   getProduct: async () => {
      const res = await getProducts();
      set({ product: res })
   },

}))