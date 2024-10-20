import { useRouter } from 'next/router'
import React, { FC, useEffect, useRef } from 'react'
import { usePagesSignoutMutation } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useModalToast } from '@/toastModal/useModalToast'

const SignoutPage: FC = () => {
  const router = useRouter()
  const { showToastSuccess } = useModalToast()
  const apolloErrorToast = useApolloErrorToast()

  const submitted = useRef<boolean>()

  const [signout] = usePagesSignoutMutation({
    onCompleted() {
      showToastSuccess('ログアウトしました。')
      router.push('/signin')
    },
    onError(e) {
      apolloErrorToast(e)
      console.log(e.message)
      router.push('/signin')
    },
  })

  useEffect(() => {
    if (!submitted.current) {
      signout({
        variables: { input: {} },
      })
      submitted.current = true
    }
  }, [signout])

  return <Loading />
}

const Page: FC = () => {
  return <SignoutPage />
}

export const getServerSideProps = async () => {
  return { props: {} }
}

export default Page
