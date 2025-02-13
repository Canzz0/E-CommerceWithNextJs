"use server";

import { cookies } from "next/headers";

export async function deletecategory(id: string) {
  const cookie = cookies();
  const token = cookie.get('Authorization')?.value;
  try {
    const response = await fetch(`${process.env.URL}/api/category`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    });
    const endResponse = JSON.parse(await response.text());
    if (response.ok) {
      return {
        status: true,
        message: endResponse.message,
      };
    } else {
      return {
        status: true,
        message: endResponse.message,
      };
    }
  } catch (error) {
    return {};
  }
}