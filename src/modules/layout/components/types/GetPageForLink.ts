/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPageForLink
// ====================================================

export interface GetPageForLink_page {
  __typename: "Page";
  id: string;
  path: string | null;
  navigationTitle: string;
}

export interface GetPageForLink {
  page: GetPageForLink_page | null;
}

export interface GetPageForLinkVariables {
  pageId?: string | null;
}
