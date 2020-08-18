/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_products {
  __typename: "Product";
  id: string;
  slug: string;
  title: string;
  description: string;
}

export interface ProductList {
  products: ProductList_products[];
}
