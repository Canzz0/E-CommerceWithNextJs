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

    if (!response.ok) {
      throw new Error(`Ürün eklenirken hata oluştu: ${response.status}`);
    }

    const endResponse = await response.json();

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
          throw new Error(`Fotoğraf yüklenirken hata oluştu: ${response2.status} - ${await response2.text()}`);
        }

      } catch (error) {
        console.error('Fotoğraf yükleme hatası:', error);
        return {
          status: false,
          message: `Fotoğraf yüklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
        };
      }
    }

    return {
      status: true,
      message: endResponse.message,
      id: endResponse.NewProduct.id,
    };

  } catch (error) {
    console.error('Ürün ekleme hatası:', error);
    return {
      status: false,
      message: `İşlem başarısız: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
    };
  }
}
