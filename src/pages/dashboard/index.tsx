import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Dashboard } from './Dashboard'
import { usePagesDashboardIndexQuery } from './index.gen'
import { Loading } from '@/toastModal/Loading'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'

const Page: NextPage = () => {
  const router = useRouter()
  const apolloErrorToast = useApolloErrorToast()
  const { data } = usePagesDashboardIndexQuery({
    fetchPolicy: 'cache-and-network',
    onError(e) {
      apolloErrorToast(e)
      router.push('/signin')
    },
  })

  if (!data?.viewer) {
    return <Loading />
  }
  return <Dashboard viewer={data.viewer} myPosts={data.myPosts} />
}

export default Page
