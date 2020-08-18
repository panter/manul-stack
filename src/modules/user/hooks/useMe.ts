import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Me } from "./types/Me";

export const getMe = (data: Me | undefined) => ({
  me: data?.me,
  isAdmin: data?.me?.roles?.some((r) => r.id === "admin") ?? false,
});

export const ME_QUERY = gql`
  query Me {
    me {
      id
      roles {
        id
      }
    }
  }
`;

const useMe = () => {
  const { data, refetch, ...props } = useQuery<Me>(ME_QUERY, {});

  return {
    ...getMe(data),
    ...props,
  };
};

export default useMe;
