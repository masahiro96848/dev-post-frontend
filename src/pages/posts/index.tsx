import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Posts } from './Posts'
import { usePagesPostsViewerQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

const PostsPage: NextPage = () => {
  const router = useRouter()

  const apolloErrorToast = useApolloErrorToast()
  const { data } = usePagesPostsViewerQuery({
    fetchPolicy: 'cache-and-network',
    onError(e) {
      apolloErrorToast(e)
      router.push('/signin')
    },
  })

  if (!data?.viewer) {
    return <Loading />
  }

  return <Posts viewer={data.viewer} />
}

export default PostsPage
