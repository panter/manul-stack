import { gql, useQuery } from "@apollo/client";
import { GetMenuPages, GetMenuPagesVariables } from "./types/GetMenuPages";
const QUERY = gql`
  query GetMenuPages($parentPageId: String) {
    pages(parentPageId: $parentPageId) {
      id
      path
      navigationTitle
    }
  }
`;

const useMenuPages = (parentPageId?: string) => {
  const { data, error, loading } = useQuery<
    GetMenuPages,
    GetMenuPagesVariables
  >(QUERY, {
    variables: {
      parentPageId,
    },
  });

  return {
    pages: data?.pages,
    error,
    loading,
  };
};

export default useMenuPages;
