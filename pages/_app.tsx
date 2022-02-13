import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "../styles/globals.css"
import Navbar from "../components/Navbar"

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com",
    cache: new InMemoryCache(),
  })

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
