/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageListing
// ====================================================

export interface ProductPageListing_products {
  __typename: "Product";
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
}

export interface ProductPageListing {
  products: ProductPageListing_products[];
}
