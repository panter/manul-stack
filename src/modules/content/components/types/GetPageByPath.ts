/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPageByPath
// ====================================================

export interface GetPageByPath_page {
  __typename: "Page";
  id: string;
  path: string | null;
  htmlTitle: string;
  meta_description: string;
  navigationTitle: string;
  social_description: string;
  social_title: string;
  content: any | null;
}

export interface GetPageByPath {
  page: GetPageByPath_page | null;
}

export interface GetPageByPathVariables {
  path: string;
}
