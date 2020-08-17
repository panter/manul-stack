/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsListing
// ====================================================

export interface ProductsListing_products {
  __typename: "Product";
  id: string;
  slug: string;
  title: string;
  description: string;
}

export interface ProductsListing {
  products: ProductsListing_products[];
}
