'use server';

import { cookies } from 'next/headers';
import { nameisValid, stockValid } from '../../../../utils/productvalidationUtils';

export async function addproduct(prevState: any, formData: any) {
  const name = formData.get('name');
  const price = parseInt(formData.get('price'));
  const image = formData.get('image1');
  const descrip = formData.get('descrip');
  const stock = parseInt(formData.get('stock'));
  const categoryId = formData.get('category_id');
  const cookie = cookies();
  const token = cookie.get('Authorization')?.value;

  console.log(image);
  // Server-side güvenli kontrol
  const isValidImage = image && image.size > 0;

  if (nameisValid(name)) {
    return {
      message: 'İsim Değerinde Özel Karakterler Bulunamaz',
    };
  }
  if (stockValid(stock)) {
    return {
      message: 'Stok Miktarı Gerçekçi Bir Rakam Olmalı',
    };
  }

  try {
    const response = await fetch(`${process.env.URL}/api/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, descrip, stock, categoryId }),
    });
    const endResponse = JSON.parse(await response.text());

    if (response.ok) {
      const id = endResponse.NewProduct.id;
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
    message: 'hata';
  }
}
