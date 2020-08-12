import { useApolloClient } from "@apollo/client";
import { useMemo } from "react"
import { LOGIN_WITH_PASSWORD_MUTATION } from "../user/hooks/useLoginWithPassword";
import { LOGOUT_MUTATION } from "../user/hooks/useLogout";
import { getMe, ME_QUERY } from "../user/hooks/useMe";

const useAuthProvider = () => {
  const apolloClient = useApolloClient()

  return useMemo(() => {
    const fetchMe = async () => {
      const { data } = await apolloClient.query({
        query: ME_QUERY,
        fetchPolicy: "network-only",
      })

      return getMe(data)
    }
    return {
      login: async ({ phoneNumber, code }) => {
        await apolloClient.mutate({
          mutation: LOGIN_WITH_PASSWORD,
          variables: {
            phoneNumber,
            code,
          },
        })

        const { isAdmin } = await fetchMe()

        if (!isAdmin) {
          throw new Error("error")
        }
        return true
      },
      logout: async () => {
        //await logout()
        apolloClient.mutate({ mutation: LOGOUT_MUTATION })
        return Promise.resolve()
      },
      checkError: (error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      },
      checkAuth: async () => {
        const { isAdmin } = await fetchMe()

        if (!isAdmin) {
          throw new Error()
        }
        return true
      },
      getPermissions: () => Promise.resolve(),
    }
  }, [])
}
export default useAuthProvider
