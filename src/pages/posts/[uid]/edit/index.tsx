import { useRouter } from 'next/router'
import React from 'react'
import { PostEdit } from './PostEdit'
import { usePagesPostEditMutation } from './index.gen'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useSuccessToast } from '@/toastModal/useSuccessToast'

const Page = () => {
  const router = useRouter()
  const { uid } = router.query

  const { showToastSuccess } = useSuccessToast()
  const apolloErrorToast = useApolloErrorToast()

  const [postEdit] = usePagesPostEditMutation({
    onCompleted() {
      showToastSuccess('記事を投稿しました')
      router.push('/dashboard')
    },
    onError: apolloErrorToast,
  })
  return (
    <PostEdit
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
