import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import {
  ProductPageListing,
  ProductPageListingVariables,
} from "./types/ProductPageListing";
import { Card, CardMedia, CardContent } from "@material-ui/core";

const Base = styled.div``;

const PRODUCT_PAGE_LISTING = gql`
  query ProductPageListing($where: ProductWhereInput) {
    products(where: $where) {
      id
      slug
      title
      imageUrl
    }
  }
`;

export type ProductPageProps = {
  style?: React.CSSProperties;
  className?: string;
  tagId?: string;
};

const ProductPage: React.FC<ProductPageProps> = ({
  style,
  className,
  tagId,
}) => {
  const { data, loading } = useQuery<
    ProductPageListing,
    ProductPageListingVariables
  >(PRODUCT_PAGE_LISTING, {
    variables: {
      where: tagId
        ? {
            tags: {
              some: {
                id: {
                  equals: tagId,
                },
              },
            },
          }
        : null,
    },
  });

  return (
    <Base style={style} className={className}>
      {!data && !loading ? (
        <div>No Products found</div>
      ) : (
        data?.products?.map((product) => (
          <Card key={product.id} style={{ maxWidth: 300 }}>
            <CardMedia
              image={product.imageUrl}
              style={{ paddingTop: "56.25%" }}
            />
            <CardContent>{product.title}</CardContent>
          </Card>
        ))
      )}
    </Base>
  );
};

export default ProductPage;
