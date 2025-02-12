'use server';

export async function getProductID({id}:any) {
  try {
   const response = await fetch(`${process.env.URL}/api/product/detail?idr=${id}`,{
      cache:'no-store',
   });

   if(!response.ok){
      throw new Error('Ürün getirilemedi');

   }
   return response.json()
  } catch (error) {
    console.error('Ürün getirme hatası:', error);
    throw error;
  }
}
