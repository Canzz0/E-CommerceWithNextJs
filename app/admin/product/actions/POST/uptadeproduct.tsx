'use server';

import { cookies } from 'next/headers';

export async function updateproduct(prevState: any, formData: any) {
  const id = formData.get('id');
  const name = formData.get('name');
  const price = parseInt(formData.get('price'));
  const image = formData.get('image1');
  const descrip = formData.get('descrip');
  const stock = parseInt(formData.get('stock'));
  const confirmImageChange = formData.get('confirmImageChange');
  const cookie = cookies();
  const token = cookie.get('Authorization')?.value;

  try {
    const response = await fetch(`${process.env.URL}/api/product`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name, price, descrip, stock }),
    });
    const endResponse = JSON.parse(await response.text());
    if (response.ok) {

      if (image && image instanceof File) {  
        try {
          const formData = new FormData();
          formData.append('image', image);
          formData.append('id', id);

          const response2 = await fetch(`${process.env.URL}/api/product/File`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
          const fileResponse = await response2.json();
          if (!response2.ok) {
            return {
              message: 'Fotoğraf Yüklenemedi',
            };
          }
        } catch (error) {
          return {
            message: 'Fotoğraf Yüklenemedi',
          };
        }
      } 
      return {
        message: endResponse.message,
        id: endResponse.NewProduct.id,
      };
    } else {
      return {
        message: endResponse.message,
      };
    }
  } catch (error) {
    return {
      message: 'Bir hata oluştu',
    };
  }
}
