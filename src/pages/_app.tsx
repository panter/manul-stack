import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getDataFromTree } from "@apollo/client/react/ssr";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
import "@react-page/plugins-slate/lib/index.css";
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";
import { createUploadLink } from "apollo-upload-client";
import withApollo from "next-with-apollo";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import { appWithTranslation, i18n } from "../config/i18n";
import theme from "../config/theme";
import BasePageLayout from "../modules/layout/components/BasePageLayout";
import { useRouter } from "next/router";
const { ROOT_URL } = require("next/config").default().publicRuntimeConfig;

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
          uri: `${!process.browser ? `${ROOT_URL}` : ""}/graphql`,
        }),
      ]),
      ssrMode: !process.browser,
      cache: new InMemoryCache().restore(initialState || {}),
    }) as any;
  },
  { getDataFromTree }
);

const getDefaultLayout = (el: any) => <BasePageLayout>{el}</BasePageLayout>;
function MyApp({ Component, pageProps, apollo }: any) {
  const lng = useRouter().query?.lng;
  useEffect(() => {
    // the backend will return some content in the language thats defined in the context
    // the client will cache that, so we have to reset it on language change
    if (lng) {
      apollo.resetStore();
    }
  }, [lng]);
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Reset />
        {getLayout(<Component {...pageProps} />)}
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
