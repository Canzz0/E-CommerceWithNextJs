import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const files = formData.getAll('image') as File[];
    const id = formData.get('id');

    if (files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
    }

    // Her bir dosyayı yükle ve URL'lerini al
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<{ secure_url: string }>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'your-folder-name' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result!); // Burada result'un null olmayacağını varsayıyoruz
              }
            }
          );

          // Buffer'ı stream'e yaz ve işlemi bitir
          uploadStream.end(buffer);
        });
      })
    );

    // Her bir yüklenen dosyanın URL'sini veritabanına kaydet
    const imageFields = ['image1']; // Alan adları
    for (let i = 0; i < uploadResults.length; i++) {
      await prisma.product.update({
        where: { id: `${id}` },
        data: { [imageFields[i]]: uploadResults[i].secure_url }, // Dinamik alan güncellemesi
      });
    }

    // Yüklenen dosyaların URL'lerini dön
    return NextResponse.json(
      { success: true, urls: uploadResults.map((result) => result.secure_url) },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
