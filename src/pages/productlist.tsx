import { useQuery, gql } from "@apollo/client";
import { ProductList as ProductListType } from "./types/ProductList";

export default function ProductList() {
  const { data, loading } = useQuery<ProductListType>(gql`
    query ProductList {
      products {
        id
        slug
        title
        description
      }
    }
  `);

  if (!data && !loading) {
    return <div>No products!</div>;
  }

  return (
    <div>
      {data?.products?.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
