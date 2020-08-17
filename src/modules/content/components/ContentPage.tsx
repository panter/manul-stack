import { gql, useQuery } from "@apollo/client";
import Editor from "@react-page/editor";
import { NextSeo } from "next-seo";
import React from "react";
import styled from "styled-components";
import { useTranslation, Link } from "../../../config/i18n";
import { plugins } from "../../reactPage/plugins";
import { GetPageByPath, GetPageByPathVariables } from "./types/GetPageByPath";
import ErrorMissing from "./ErrorMissing";

const Base = styled.div``;

export type ContentPageProps = {
  path: string;
};

const QUERY = gql`
  query GetPageByPath($path: String!) {
    page(path: $path) {
      id
      path
      htmlTitle
      meta_description
      navigationTitle
      social_description
      social_title
      content
    }
  }
`;
const ContentPage: React.FC<ContentPageProps> = ({ path }) => {
  const { i18n } = useTranslation();
  const { data, loading, error } = useQuery<
    GetPageByPath,
    GetPageByPathVariables
  >(QUERY, {
    variables: { path },
  });

  const page = data?.page;
  if (!page && !loading) {
    return <ErrorMissing />;
  }
  if (!page) {
    return null;
  }
  return (
    <>
      <NextSeo
        title={page.htmlTitle || page.navigationTitle}
        description={page.meta_description}
        openGraph={{
          title: page.social_title || page.htmlTitle || page.navigationTitle,
          description: page.social_description || page.meta_description,
        }}
      />
      <Base>
        <Link href="/admin" as={`/admin#/Page/${page.id}/1`}>
          <a>Edit page</a>
        </Link>
        {page.content ? (
          <Editor
            lang={i18n.language}
            value={page.content}
            plugins={plugins}
            readOnly
          />
        ) : null}
      </Base>
    </>
  );
};

export default ContentPage;
