import { Container } from '@mantine/core'
import React from 'react'
import { RegisterOperation } from './register'

const Page:React.FC = () => {
  return (
    <Container size='xl'>
              <RegisterOperation/>
    </Container>
  )
}

export default Page