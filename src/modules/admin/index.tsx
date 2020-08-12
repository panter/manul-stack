import { Admin, Resource } from "react-admin";
import { useDataProvider } from "@ra-data-prisma/dataprovider";
import useAuthProvider from "./useAuthProvider";
import userResource from "./resources/user";

const AdminApp = () => {
  const dataProvider = useDataProvider({
    clientOptions: {
      uri: "/graphql",
    },
    aliasPrefix: "admin",
  });
  const authProvider = useAuthProvider();

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {userResource()}
    </Admin>
  );
};

export default AdminApp;
