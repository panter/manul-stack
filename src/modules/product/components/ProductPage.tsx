import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { ProductPageListing } from "./types/ProductPageListing";

const Base = styled.div``;

const PRODUCT_PAGE_LISTING = gql`
  query ProductPageListing {
    products {
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
};

const ProductPage: React.FC<ProductPageProps> = ({ style, className }) => {
  const { data, loading } = useQuery<ProductPageListing>(PRODUCT_PAGE_LISTING);

  return (
    <Base style={style} className={className}>
      {!data && !loading ? (
        <div>No Products found</div>
      ) : (
        data?.products?.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))
      )}
    </Base>
  );
};

export default ProductPage;
