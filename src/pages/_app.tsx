// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import { Reset } from "styled-reset";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";
import "@react-page/plugins-slate/lib/index.css";
import React from "react";
import withApollo from "next-with-apollo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { ThemeProvider } from "styled-components";
import theme from "../config/theme";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { appWithTranslation, i18n } from "../config/i18n";

const withApolloClient = withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: from([
        setContext((a, b) => {
          return {
            headers: {
              ["accept-language"]: i18n.language,
            },
          };
        }) as any,

        createUploadLink({
          uri: `${!process.browser ? `${process.env.ROOT_URL}` : ""}/graphql`,
        }),
      ]),
      ssrMode: !process.browser,
      cache: new InMemoryCache().restore(initialState || {}),
    }) as any;
  },
  { getDataFromTree }
);

function MyApp({ Component, pageProps, apollo }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Reset />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx, ...rest }: any) => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    pageProps: {
      namespacesRequired: ["common"],
      ...pageProps,
    },
  };
};

export default appWithTranslation(withApolloClient(MyApp));
