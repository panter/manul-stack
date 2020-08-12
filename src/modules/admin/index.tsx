import { Admin, Login } from "react-admin";
import { useDataProvider } from "@ra-data-prisma/dataprovider";
import useAuthProvider from "./useAuthProvider";

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
        loginPage={() => (
          <Login>
            <div>ja hier kommt das login, he, gäll</div>
          </Login>
        )}
      >
      </Admin>
    )
  }


export default AdminApp
  