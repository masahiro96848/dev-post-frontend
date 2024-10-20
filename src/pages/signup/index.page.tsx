import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { Signup } from './Signup'
import { usePagesSignupMutation } from './index.gen'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useModalToast } from '@/toastModal/useModalToast'

const SignupPage: FC = () => {
  const router = useRouter()
  const { showToastSuccess } = useModalToast()
  const apolloErrorToast = useApolloErrorToast()

  const [signup] = usePagesSignupMutation({
    onCompleted() {
      showToastSuccess('ユーザー登録に成功しました。')
      router.push('/posts')
    },
    onError: apolloErrorToast,
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

export const getServerSideProps = async () => {
  return { props: {} }
}

export default SignupPage
