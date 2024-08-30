import { NextPage } from 'next'
import React, { useState, useMemo } from 'react'
import { Posts } from './Posts'
import { usePagesPostsIndexQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

const PostsPage: NextPage = () => {
  const apolloErrorToast = useApolloErrorToast()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 12

  const offset = useMemo(
    () => (currentPage - 1) * postsPerPage,
    [currentPage, postsPerPage],
  )

  const { data } = usePagesPostsIndexQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: postsPerPage,
      offset,
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
