import { NextPage } from 'next'
import React, { useState } from 'react'
import { Posts } from './Posts'
import { usePagesPostsIndexQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

const PostsPage: NextPage = () => {
  const apolloErrorToast = useApolloErrorToast()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12

  const { data } = usePagesPostsIndexQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: postsPerPage,
      offset: (currentPage - 1) * postsPerPage,
    },
    onError(e) {
      apolloErrorToast(e)
    },
  })

  if (!data) {
    return <Loading />
  }

  return (
    <Posts
      viewer={data.viewer}
      posts={data.posts}
      totalPosts={data.totalPosts}
      currentPage={currentPage}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default PostsPage
