/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMenuPages
// ====================================================

export interface GetMenuPages_pages {
  __typename: "Page";
  id: string;
  path: string | null;
  navigationTitle: string;
}

export interface GetMenuPages {
  pages: GetMenuPages_pages[] | null;
}

export interface GetMenuPagesVariables {
  parentPageId?: string | null;
}
