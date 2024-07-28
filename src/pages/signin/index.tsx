import { useRouter } from 'next/router'
import React from 'react'
import { Signin } from './Signin'
import { usePagesSigninMutation } from './index.gen'

const SigninPage = () => {
  const router = useRouter()
  const [signin] = usePagesSigninMutation({
    onCompleted() {
      router.push('/dashboard')
    },
    onError: (error) => console.log('Error:', error.message),
  })

  return (
    <Signin
      onSubmit={(values) => {
        signin({
          variables: {
            input: {
              email: values.email,
              password: values.password,
            },
          },
        })
      }}
    />
  )
}

export default SigninPage
