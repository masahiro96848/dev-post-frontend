import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client'

export const createClient = () => {
  const link = createHttpLink({
    uri: process.env.APOLLO_CLIENT_API_HOST,
    credentials: 'include',
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })
}
