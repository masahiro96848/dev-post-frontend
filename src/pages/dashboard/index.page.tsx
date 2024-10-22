import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useMemo, useEffect } from 'react'
import { Dashboard } from './Dashboard'
import {
  usePagesDashboardIndexQuery,
  usePagesDashboardMypostsSortMutation,
} from './index.gen'
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

  const { data: indexData, loading: indexLoading } =
    usePagesDashboardIndexQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        limit: postsPerPage,
        offset,
      },
      onError(e) {
        apolloErrorToast(e)
        router.push('/signin')
      },
    })

  // ソート用ミューテーション
  const [mypostSort, { loading: sortLoading }] =
    usePagesDashboardMypostsSortMutation({
      onCompleted: (data) => {
        setSortedPosts(data.mypostSort.myposts || [])
      },
      onError: apolloErrorToast,
    })

  // クエリパラメータに基づいてソートとページングを実行
  useEffect(() => {
    mypostSort({
      variables: {
        sortBy,
        order,
        limit: postsPerPage,
        offset,
      },
    })
  }, [sortBy, order, currentPage, offset, mypostSort, postsPerPage])

  if (indexLoading || sortLoading) {
    return <Loading />
  }

  if (!indexData) {
    return <Loading />
  }

  return (
    <Dashboard
      viewer={indexData.viewer}
      myposts={sortedPosts.length > 0 ? sortedPosts : indexData.myposts}
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
