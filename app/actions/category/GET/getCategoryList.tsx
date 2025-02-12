"use server";
export async function GetCategoryList() {
  try {
    const response = await fetch(`${process.env.URL}/api/category`);
    if (!response.ok) {
      throw new Error('Kategori getirilemedi');
    }
    return response.json();
  } catch (error) {
    console.error('Ürün getirme hatası:', error);
    throw error;
  }
}
