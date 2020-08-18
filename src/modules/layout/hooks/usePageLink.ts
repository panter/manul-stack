import { gql, useQuery } from "@apollo/client";
import {
  GetPageForLink,
  GetPageForLinkVariables,
  GetPageForLink_page,
} from "./types/GetPageForLink";
import usePreventOnClickInEditor from "../../reactPage/hooks/usePreventOnClickInEditor";
export type UsePageLinkProps = {
  pageId?: string;
  path?: string;
  page?: GetPageForLink_page;
};

const QUERY = gql`
  query GetPageForLink($pageId: String, $path: String) {
    page(pageId: $pageId, path: $path) {
      id
      path
      navigationTitle
    }
  }
`;
const usePageLink = ({ page, pageId, path }: UsePageLinkProps) => {
  const { data } = useQuery<GetPageForLink, GetPageForLinkVariables>(QUERY, {
    variables: {
      pageId,
      path,
    },
    skip: Boolean(page) || (!pageId && !path),
  });
  const onClick = usePreventOnClickInEditor();
  const thePage = data?.page ?? page;
  if (!thePage) {
    return null;
  } else {
    const { path, navigationTitle } = thePage;
    return {
      onClick,
      href: {
        pathname: "/[...path]",
        query: { path },
      },
      navigationTitle,
      as: path,
    };
  }
};

export default usePageLink;
