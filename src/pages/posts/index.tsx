import { NextPage } from 'next'
import React from 'react'
import { Posts } from './Posts'
import { usePagesPostsIndexQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

const PostsPage: NextPage = () => {
  const apolloErrorToast = useApolloErrorToast()
  const { data } = usePagesPostsIndexQuery({
    fetchPolicy: 'cache-and-network',
    onError(e) {
      apolloErrorToast(e)
    },
  })

  if (!data) {
    return <Loading />
  }

  return <Posts viewer={data.viewer} posts={data.posts} />
}

export default PostsPage
