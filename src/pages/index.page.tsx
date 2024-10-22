import { Spinner, Center } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useMemo, useEffect } from 'react'
import { IndexScreen } from './IndexScreen'
import { usePagesPostsIndexQuery, usePagesPostsSortMutation } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { Post } from '@/types/graphql.gen'

const Page: NextPage = () => {
  const router = useRouter()
  const { query } = router
  const apolloErrorToast = useApolloErrorToast()

  const postsPerPage = 12

  // クエリパラメータから状態を初期化
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(query.page as string) || 1,
  )
  const [sortBy, setSortBy] = useState<string>(
    query.sort_by ? (query.sort_by as string) : 'created_at',
  )
  const [order, setOrder] = useState<string>(
    query.order ? (query.order as string) : 'desc',
  )
  const [sortedPosts, setSortedPosts] = useState<Post[]>([])

  const offset = useMemo(
    () => (currentPage - 1) * postsPerPage,
    [currentPage, postsPerPage],
  )

  // 初期データ取得クエリ
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

  // ソート用ミューテーション
  const [postSort, { loading: sortLoading }] = usePagesPostsSortMutation({
    onCompleted: (data) => {
      setSortedPosts(data.postSort?.posts || [])
    },
    onError: apolloErrorToast,
  })

  // クエリパラメータに基づいてソートとページングを実行
  useEffect(() => {
    postSort({
      variables: {
        sortBy,
        order,
        limit: postsPerPage,
        offset,
      },
    })
  }, [sortBy, order, currentPage, offset, postSort, postsPerPage])

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

  if (!indexData) {
    return <Loading />
  }

  return (
    <IndexScreen
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

export const getServerSideProps = async () => {
  return { props: {} }
}

export default Page
