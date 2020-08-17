import { Admin, Resource } from "react-admin";
import { useDataProvider } from "@ra-data-prisma/dataprovider";
import useAuthProvider from "./useAuthProvider";
import userResource from "./resources/user";
import blogPostResource from "./resources/blogPost";
import productsResource from "./resources/product";
import pageResource from "./resources/page";
import { useApolloClient } from "@apollo/client";

const AdminApp = () => {
  const apolloClient = useApolloClient();
  const dataProvider = useDataProvider({
    client: apolloClient,
    aliasPrefix: "admin",
  });
  const authProvider = useAuthProvider();

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {userResource()}
      {pageResource()}
      {blogPostResource()}
      {productsResource()}
    </Admin>
  );
};

export default AdminApp;
