// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import { Reset } from "styled-reset";
import React from "react"
import withApollo from "next-with-apollo"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { getDataFromTree } from "@apollo/client/react/ssr"


const withApolloClient = withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: `${!process.browser ? `${process.env.ROOT_URL}` : ""}/api/graphql`,
      ssrMode: !process.browser,
      cache: new InMemoryCache().restore(initialState || {}),
    }) as any
  },
  { getDataFromTree },
)


function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Reset />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default withApolloClient(MyApp);
