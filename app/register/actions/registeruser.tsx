"use server";
import { cookies } from "next/headers";
import { emailIsValid, passwordMatchValid } from "../../utils/validationUtils";

export async function registerUser(prevState:any, formData:any) {
  const email = formData.get("email");
  const password = formData.get("password");
  const repassword = formData.get("repassword");
  const name = formData.get("name");
  const secretkey = formData.get("secretkey");
  if (!emailIsValid(email)) {
    return {
      message: "Geçersiz E-posta adresi",
    };
  }

   

  if(!passwordMatchValid(password,repassword)){
    return{
      message: "Parolalar Eşleşmiyor",

    }
  }


  try {
    const response = await fetch(process.env.URL+"/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password,name,secretkey }),
    });


    const endResponse = JSON.parse(await response.text());
    if (response.ok) {
      const cookie=cookies()
      cookie.set('Authorization',endResponse.token, { secure: true })
      return {
        login:true,
        message: "Giriş Başarılı",
        
      };

    } else {
      return {
        message: "Giriş Başarısız: " + endResponse.message,
      };
    }
  } catch (error) {
    return {};
  }
}