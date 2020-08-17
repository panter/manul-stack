import { useApolloClient } from "@apollo/client";
import { useMemo } from "react";
import { LOGIN_WITH_PASSWORD_MUTATION } from "../user/hooks/useLoginWithPassword";
import { LOGOUT_MUTATION } from "../user/hooks/useLogout";
import { getMe, ME_QUERY } from "../user/hooks/useMe";
import {
  LoginWithPassword,
  LoginWithPasswordVariables,
} from "../user/hooks/types/LoginWithPassword";

const useAuthProvider = () => {
  const apolloClient = useApolloClient();

  return useMemo(() => {
    const fetchMe = async () => {
      const { data } = await apolloClient.query({
        query: ME_QUERY,
        fetchPolicy: "network-only",
      });

      return getMe(data);
    };
    return {
      login: async ({ username, password }) => {
        await apolloClient.mutate<
          LoginWithPassword,
          LoginWithPasswordVariables
        >({
          mutation: LOGIN_WITH_PASSWORD_MUTATION,
          variables: {
            email: username,
            password,
          },
        });

        const { isAdmin } = await fetchMe();

        if (!isAdmin) {
          throw new Error("error");
        }
        return true;
      },
      logout: async () => {
        apolloClient.mutate({ mutation: LOGOUT_MUTATION });
        return Promise.resolve();
      },
      checkError: (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      },
      checkAuth: async () => {
        const { isAdmin } = await fetchMe();

        if (!isAdmin) {
          throw new Error();
        }
        return true;
      },
      getPermissions: () => Promise.resolve(),
    };
  }, []);
};
export default useAuthProvider;
