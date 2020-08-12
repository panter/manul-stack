import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import { Me } from "./types/Me";

export const getMe = (data: Me | undefined) => ({
  me: data?.me,
})

export const ME_QUERY = gql`
  query Me {
    me {
      id
    }
  }
`

const useMe = () => {
  const { data, refetch, ...props } = useQuery<Me>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  })

  return {
    ...getMe(data),
    ...props,
  }
}

export default useMe
