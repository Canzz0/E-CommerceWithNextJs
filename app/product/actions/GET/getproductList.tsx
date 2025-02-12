'use server';


export async function getProducts() {
  try {
    const response = await fetch(`${process.env.URL}/api/product`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Ürünler getirilemedi');
    }

    return response.json();
  } catch (error) {
    console.error('Ürün getirme hatası:', error);
    throw error;
  }
}
