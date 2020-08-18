import { Admin, Resource } from "react-admin";
import { useDataProvider } from "@ra-data-prisma/dataprovider";
import useAuthProvider from "./useAuthProvider";
import userResource from "./resources/user";
import userRoleResource from "./resources/userRole";
import blogPostResource from "./resources/blogPost";
import pageResource from "./resources/page";
import { useApolloClient } from "@apollo/client";
import { muiTheme } from "../../pages/_app";

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
    <Admin
      theme={muiTheme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {userResource()}
      {userRoleResource()}
      {pageResource()}
      {blogPostResource()}
    </Admin>
  );
};

export default AdminApp;
