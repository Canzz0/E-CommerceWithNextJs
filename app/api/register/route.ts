'use server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const { email, password, secretkey, name } = await req.json();
    // Gelen secret key'i kontrol et
    if (secretkey !== secretKey) {
      return new Response(
        JSON.stringify({ message: 'Geçersiz secret key' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Bu email adresi zaten kayıtlı' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId: '1',
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Kullanıcı başarıyla oluşturuldu',
        user: newUser,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Bir hata oluştu',
        error: error,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req: any) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Kullanıcı bulunamadı' }), 
        { status: 404 }
      );
    }
    await prisma.user.delete({ where: { id: user.id } });
    return new Response(
      JSON.stringify({ message: 'Kullanıcı başarıyla silindi' }), 
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Bir hata oluştu', error }), 
      { status: 500 }
    );
  }
}