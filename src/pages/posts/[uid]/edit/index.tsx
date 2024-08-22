import { useRouter } from 'next/router'
import React from 'react'
import { PostEdit } from './PostEdit'
import {
  usePagesPostEditIndexQuery,
  usePagesPostEditMutation,
} from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useSuccessToast } from '@/toastModal/useSuccessToast'

const Page = () => {
  const router = useRouter()
  const { uid } = router.query

  const { showToastSuccess } = useSuccessToast()
  const apolloErrorToast = useApolloErrorToast()

  const { data } = usePagesPostEditIndexQuery({
    fetchPolicy: 'cache-and-network',
    onError(e) {
      apolloErrorToast(e)
    },
  })

  const [postEdit] = usePagesPostEditMutation({
    onCompleted() {
      showToastSuccess('記事を投稿しました')
      router.push('/dashboard')
    },
    onError: apolloErrorToast,
  })

  if (!data) {
    return <Loading />
  }

  return (
    <PostEdit
      viewer={data.viewer}
      onSubmit={(values) => {
        postEdit({
          variables: {
            input: {
              title: values.title,
              body: values.body,
              imageUrl: values.imageUrl,
              isPublished: values.isPublished,
              uid: uid as string,
            },
          },
        })
      }}
    />
  )
}

export default Page
