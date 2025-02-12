"use client"
import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core';
import classes from './register.module.css';
import { useFormState } from 'react-dom';
import {  registerUser } from './actions/registeruser';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  login:false
};

export function RegisterOperation() {
  const router = useRouter();
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const result = await registerUser(prevState, formData);
    if (result.login) {
      router.push('/login');
    }
    return result;
  }, initialState);
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Kayıt Ol
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form action={formAction}>
          <TextInput id="name" name="name" label="Adınız" placeholder="Adınız" required />
          <TextInput id="email" name="email" label="E-Posta" placeholder="can@makettech.dev" required mt="md" />
          <PasswordInput  id="password" name="password" label="Şifre" placeholder="Şifreniz" required mt="md" />
          <PasswordInput id="repassword" name="repassword" label="Şifre Tekrar" placeholder="Şifreniz" required mt="md" />
          <TextInput id="secretkey" name="secretkey" label="Gizli Anahtar"  required mt="md" />

          <p aria-live="polite">{state?.message}</p>
          <Button type='submit' fullWidth mt="xl">
            Kayıt Ol
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
