import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com",
    cache: new InMemoryCache(),
  })

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
