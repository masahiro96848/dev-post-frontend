import React, { FC } from 'react'

import Signup from './Signup'
import { usePagesSignupMutation } from './index.gen'

const SignupPage: FC = () => {
  const [signup] = usePagesSignupMutation({
    onCompleted(data) {
      console.log('Signup successful:', data)
    },
    onError: (error) => console.log('Something Error:', error.message),
  })
  return (
    <Signup
      onSubmit={(values) => {
        signup({
          variables: {
            input: {
              email: values.email,
              password: values.password,
              passwordConfirmation: values.passwordConfirmation,
            },
          },
        })
      }}
    />
  )
}

export default SignupPage
