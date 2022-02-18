import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import "../styles/globals.css"
import Navbar from "../components/Navbar"
import { setContext } from "@apollo/client/link/context"

export default function App({ Component, pageProps }: AppProps) {
  const httpLink = createHttpLink({
    uri: "https://api.hashnode.com",
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("HASHNODE_API_KEY")
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
