import React from "react";
import styled from "styled-components";
import { Link } from "../../../config/i18n";
import { gql, useQuery } from "@apollo/client";
import StyledLink from "./StyledLink";
import {
  GetPageForLink,
  GetPageForLinkVariables,
  GetPageForLink_page,
} from "./types/GetPageForLink";
export type PageLinkProps = {
  pageId?: string;
  page?: GetPageForLink_page;
  style?: {};
  className?: string;
};

const QUERY = gql`
  query GetPageForLink($pageId: String) {
    page(pageId: $pageId) {
      id
      path
      navigationTitle
    }
  }
`;
const PageLink: React.FC<PageLinkProps> = ({
  page,
  pageId,
  style,
  className,
}) => {
  const { data } = useQuery<GetPageForLink, GetPageForLinkVariables>(QUERY, {
    variables: {
      pageId,
    },
    skip: Boolean(page),
  });
  const thePage = data?.page ?? page;
  if (!thePage) {
    return null;
  }
  const { path, navigationTitle } = thePage;
  return (
    <Link
      href={{
        pathname: "/[...path]",
        query: { path },
      }}
      as={path!}
      passHref
    >
      <StyledLink style={style} className={className}>
        {navigationTitle}
      </StyledLink>
    </Link>
  );
};

export default PageLink;
