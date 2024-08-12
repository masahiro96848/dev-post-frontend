import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import { Detail } from './Detail'
import { usePagesPostDetailIndexQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

type PageProps = {
  uid: string
  name: string
}

const Page: NextPage<PageProps> = (props: PageProps) => {
  const { uid, name } = props
  const apolloErrorToast = useApolloErrorToast()
  const { data } = usePagesPostDetailIndexQuery({
    variables: {
      uid,
      name,
    },
    fetchPolicy: 'no-cache',
    onError(e) {
      apolloErrorToast(e)
    },
  })

  if (!data?.postDetail) {
    return <Loading />
  }
  return <Detail post={data.postDetail} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid, name } = context.query

  if (typeof uid !== 'string' || typeof name !== 'string') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      uid,
      name,
    },
  }
}

export default Page
