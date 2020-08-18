import {
  Edit,
  TextInput,
  Create,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  EditButton,
  Filter,
  Resource,
  SelectInput,
  ReferenceInput,
  BooleanInput,
  required,
} from "react-admin";

const ProductList = (props) => (
  <List {...props} perPage={20}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

const ProductCreate = (props) => (
  <Create title="Create a Product" {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="description" validate={required()} />
    </SimpleForm>
  </Create>
);

const ProductEdit = (props) => (
  <Edit title="Edit a Product" {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="description" validate={required()} />
    </SimpleForm>
  </Edit>
);

const productResource = () => (
  <Resource
    name="Product"
    list={ProductList}
    edit={ProductEdit}
    create={ProductCreate}
  />
);
export default productResource;
