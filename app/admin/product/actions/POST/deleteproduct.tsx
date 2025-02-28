"use server";

import { cookies } from "next/headers";

export async function DeleteProduct(id: string) {
    const cookie = cookies();
    const token = cookie.get('Authorization')?.value;
    try {
        const response = await fetch(`${process.env.URL}/api/product`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        return {
            status: true,
            message: data.message
        };
    } catch (error) {
        return {
            status: false,
            message: "Ürün silinirken bir hata oluştu"
        };
    }
}