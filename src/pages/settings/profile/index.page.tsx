import { useRouter } from 'next/router'
import React from 'react'
import { Profile } from './Profile'
import {
  usePagesProfileEditIndexQuery,
  usePagesProfileEditMutation,
} from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useModalToast } from '@/toastModal/useModalToast'

const Page = () => {
  const router = useRouter()
  const { showToastSuccess } = useModalToast()
  const apolloErrorToast = useApolloErrorToast()

  const { data } = usePagesProfileEditIndexQuery({
    fetchPolicy: 'cache-and-network',
    onError(e) {
      apolloErrorToast(e)
    },
  })

  const [profileEdit] = usePagesProfileEditMutation({
    onCompleted() {
      showToastSuccess('プロフィールを更新しました')
      router.push('/dashboard')
    },
    onError(e) {
      apolloErrorToast(e)
    },
  })

  if (!data) {
    return <Loading />
  }

  return (
    <Profile
      viewer={data.viewer}
      onSubmit={(values) => {
        profileEdit({
          variables: {
            input: {
              name: values.name,
              bio: values.bio,
              imageUrl: values.imageUrl,
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

export default Page
