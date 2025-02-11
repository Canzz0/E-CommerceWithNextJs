"use server";

import { cookies } from "next/headers";

export async function DeleteProduct(id: string) {
    const cookie = cookies();
    const token = cookie.get('Authorization')?.value;
    try {
        const response = await fetch(`http://localhost:3000/api/product`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { message: "Ürün silinirken bir hata oluştu" };
    }
}