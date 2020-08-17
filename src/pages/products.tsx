import styled from "styled-components";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ProductsListing } from "./types/ProductsListing";

const Base = styled.div`
  display: flex;
  padding: 20px;
`;

const PRODUCTS_LISTING_QUERY = gql`
  query ProductsListing {
    products {
      id
      slug
      title
      description
    }
  }
`;

export default function Products() {
  const { data, loading } = useQuery<ProductsListing>(PRODUCTS_LISTING_QUERY);

  if (!data?.products?.length && !loading) {
    return <Base>No Products found</Base>;
  }

  return (
    <Base>
      {data?.products?.map((product) => {
        return <div key={product.id}>{product.slug}</div>;
      })}
    </Base>
  );
}
