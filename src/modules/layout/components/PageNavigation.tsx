import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { GetMenuPages, GetMenuPagesVariables } from "./types/GetMenuPages";
import { Link } from "../../../config/i18n";
import PageLink from "./PageLink";
const Base = styled.ul`
  & > li {
    margin-left: 10px;
    list-style-type: disc;
  }
`;

export type PageNavigationProps = {
  style?: React.CSSProperties;
  className?: string;
  parentPageId?: string;
};

const QUERY = gql`
  query GetMenuPages($parentPageId: String) {
    pages(parentPageId: $parentPageId) {
      id
      path
      navigationTitle
    }
  }
`;

const PageNavigation: React.FC<PageNavigationProps> = ({
  style,
  className,
  parentPageId,
}) => {
  const { data } = useQuery<GetMenuPages, GetMenuPagesVariables>(QUERY, {
    variables: {
      parentPageId,
    },
  });
  if (!data?.pages) {
    return null;
  }
  return (
    <Base style={style} className={className}>
      {!parentPageId ? (
        <li>
          <PageLink path="/" />
        </li>
      ) : null}
      {data?.pages.map((page) => (
        <li key={page.id}>
          <PageLink page={page} />
          <PageNavigation parentPageId={page.id} />
        </li>
      ))}
    </Base>
  );
};

export default PageNavigation;
