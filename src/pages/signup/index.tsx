import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { Signup } from './Signup'
import { usePagesSignupMutation } from './index.gen'
import { useSuccessToast } from '@/toastModal/useSuccessToast'

const SignupPage: FC = () => {
  const router = useRouter()
  const { showToastSuccess } = useSuccessToast()
  const [signup] = usePagesSignupMutation({
    onCompleted() {
      showToastSuccess('ユーザー登録に成功しました。')
      router.push('/dashboard')
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
