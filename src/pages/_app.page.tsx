import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppApolloProvider } from '@/apollo/provider'
import { ThemeProvider } from '@/theme/Provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppApolloProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppApolloProvider>
  )
}
