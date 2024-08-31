import { Spinner, Center } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useState, useMemo, useEffect } from 'react'
import { Posts } from './Posts'
import { usePagesPostsIndexQuery, usePagesPostsSortMutation } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { Post } from '@/types/graphql.gen'

const PostsPage: NextPage = () => {
  const apolloErrorToast = useApolloErrorToast()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 12

  const offset = useMemo(
    () => (currentPage - 1) * postsPerPage,
    [currentPage, postsPerPage],
  )

  // ソート順の管理
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [order, setOrder] = useState<string>('desc')
  const [sortedPosts, setSortedPosts] = useState<Post[]>([])

  const { data: indexData, loading: indexLoading } = usePagesPostsIndexQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: postsPerPage,
      offset,
    },
    onError(e) {
      apolloErrorToast(e)
    },
  })

  const [postSort, { loading: sortLoading }] = usePagesPostsSortMutation({
    onCompleted: (data) => {
      setSortedPosts(data.postSort?.posts || [])
    },
    onError: apolloErrorToast,
  })

  useEffect(() => {
    postSort({
      variables: {
        sortBy: sortBy,
        order: order,
        limit: postsPerPage,
        offset: offset,
      },
    })
  }, [sortBy, order, postSort, postsPerPage, offset])

  if (!indexData) {
    return <Loading />
  }

  // データ取得中にスピナーを表示
  if (indexLoading || sortLoading) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    )
  }

  return (
    <Posts
      viewer={indexData.viewer}
      posts={sortedPosts.length > 0 ? sortedPosts : indexData.posts}
      totalPosts={indexData.totalPosts}
      currentPage={currentPage}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      setSortBy={setSortBy}
      setOrder={setOrder}
    />
  )
}

export default PostsPage
