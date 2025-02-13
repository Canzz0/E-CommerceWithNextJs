'use server';

import { cookies } from 'next/headers';

export async function updateproduct(prevState: any, formData: any) {
  const id = formData.get('id');
  const name = formData.get('name');
  const price = parseInt(formData.get('price'));
  const image = formData.get('image1');
  const descrip = formData.get('descrip');
  const stock = parseInt(formData.get('stock'));
  const cookie = cookies();
  const token = cookie.get('Authorization')?.value;
  const isValidImage = image && image.size > 0;

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

      if (isValidImage) {
        try {
          const imgData = new FormData();



          imgData.append('image', image);
          imgData.append('id', id);

          const response2 = await fetch(`${process.env.URL}/api/product/File`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imgData,
          });

          if (!response2.ok) {
            throw new Error('Fotoğraf Yüklenemedi');
          }


        } catch (error) {
          return {
            status: false,
            message: 'Fotoğraf Yüklenemedi',
          };
        }
      }
      return {
        status: true,
        message: endResponse.message,
        id: endResponse.NewProduct.id,
      };

    } else {
      return {
        status: false,
        message: endResponse.message,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Bir hata oluştu',
    };
  }
}
