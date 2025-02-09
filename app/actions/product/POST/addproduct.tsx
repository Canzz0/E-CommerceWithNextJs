'use server';

import { cookies } from 'next/headers';
import { imgValid, nameisValid, stockValid } from '../../../utils/productvalidationUtils';
export async function addproduct(prevState: any, formData: any) {
  const name = formData.get('name');
  const price = parseInt(formData.get('price'));
  const image = formData.get('image1');
  const descrip = formData.get('descrip');
  const stock = parseInt(formData.get('stock'));
  const cookie = cookies();
  const token = cookie.get('Authorization')?.value;


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
  if (imgValid(image)) {
    return {
      message: 'Medya Dosyası Boyutu En Fazla 4MB Olabilir',
    };
  }
  try {
    const response = await fetch('http://localhost:3000/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, descrip, stock }),
    });
    const endResponse = JSON.parse(await response.text());

    if (response.ok) {
      const id = endResponse.NewProduct.id;
      try {
        const imgData = new FormData();
        
        // Tüm resimleri kontrol et ve yükle
        for (let i = 1; i <= 4; i++) {
          const image = formData.get(`image${i}`);
          if (image) {
            imgData.append('image', image);
            imgData.append('id', id);
            
            const response2 = await fetch('http://localhost:3000/api/product/File', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: imgData,
            });

            if (!response2.ok) {
              throw new Error('Fotoğraf Yüklenemedi');
            }
          }
        }
      } catch (error) {
        return {
          message: 'Fotoğraf Yüklenemedi',
        };
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
    message: 'hata';
  }
}
