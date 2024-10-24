import { useRouter } from 'next/router'
import React from 'react'
import { Signin } from './Signin'
import { usePagesSigninMutation } from './index.gen'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useModalToast } from '@/toastModal/useModalToast'

const SigninPage = () => {
  const router = useRouter()
  const { showToastSuccess } = useModalToast()
  const apolloErrorToast = useApolloErrorToast()

  const [signin] = usePagesSigninMutation({
    onCompleted() {
      showToastSuccess('ログインに成功しました。')
      router.push('/posts')
    },
    onError: apolloErrorToast,
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

export const getServerSideProps = async () => {
  return { props: {} }
}

export default SigninPage
