import '@/styles/globals.css'

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/theme/Provider'

export default function App({ Component, pageProps }: AppProps) {
  const link = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
