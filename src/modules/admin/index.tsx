import { Admin, Resource } from "react-admin";
import { useDataProvider } from "@ra-data-prisma/dataprovider";
import useAuthProvider from "./useAuthProvider";
import { UserList, UserEdit } from "./resources/user";

const AdminApp = () => {
    const dataProvider = useDataProvider()
    const authProvider = useAuthProvider()

    if (!dataProvider) {
      return <div>Loading</div>
    }

    return (
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource name="User" list={UserList} edit={UserEdit} />
      </Admin>
    )
  }


export default AdminApp
