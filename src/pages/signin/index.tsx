import React from 'react'
import { Signin } from './Signin'
import { usePagesSigninMutation } from './index.gen'

const SigninPage = () => {
  const [signin] = usePagesSigninMutation({
    onCompleted(data) {
      console.log('Login successful:', data)
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
