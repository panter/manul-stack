import { useMutation, gql } from "@apollo/client"
import { Logout } from "./types/Logout"

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`
const useLogout = () => useMutation<Logout>(LOGOUT_MUTATION)
export default useLogout
