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
import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";

import CssBaseline from "@material-ui/core/CssBaseline";
import { appWithTranslation, i18n, useTranslation } from "../config/i18n";
import theme from "../config/theme";
import BasePageLayout from "../modules/layout/components/BasePageLayout";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ef5867",
    },
    secondary: {
      main: "#50c5f0",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontFamily: '"Libre Baskerville", serif',

      fontSize: "6rem",
    },
    h2: {
      fontFamily: '"Libre Baskerville", serif',
      fontSize: "4rem",
    },
    h3: {
      fontFamily: '"Libre Baskerville", serif',
      fontSize: "3rem",
    },
    h4: {
      fontFamily: '"Libre Baskerville", serif',
      fontSize: "2rem",
    },
  },
});
const { ROOT_URL } = require("next/config").default().publicRuntimeConfig;

const withApolloClient = withApollo(
  ({ initialState, ctx }) => {
    return new ApolloClient({
      link: from([
        setContext(() => {
          const headers: {
            "accept-language"?: string;
            authorization?: string;
          } = {
            ["accept-language"]: i18n.language,
          };

          // add auth header for ssr executed
          // queries to pass the cookie token
          const token = (ctx?.req as any)?.cookies?.token;
          if (!process.browser && token) {
            headers.authorization = token;
          }

          return {
            headers,
          };
        }) as any,

        createUploadLink({
          uri: `${!process.browser ? `${ROOT_URL}` : ""}/api/graphql`,
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
  const { i18n } = useTranslation();
  const previousLang = useRef<string>();
  useEffect(() => {
    const onLangChange = (lng) => {
      if (!previousLang.current) {
        previousLang.current = lng;
      } else if (previousLang.current !== lng) {
        previousLang.current = lng;
        // the backend will return some content in the language thats defined in the context
        // the client will cache that, so we have to reset it on language change

        apollo.resetStore();
      }
    };
    i18n.on("languageChanged", onLangChange);
    return () => {
      i18n.off("languageChanged", onLangChange);
    };
  });

  const getLayout = Component.getLayout ?? getDefaultLayout;
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ThemeProvider>
    </MuiThemeProvider>
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
