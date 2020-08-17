import React from "react";

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
} from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Title" source="title" alwaysOn />
  </Filter>
);

export const ProductList = (props) => (
  <List {...props} filters={<ProductFilter />} perPage={20}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

const renderForm = (isCreate = false) => (
  <>
    <TextInput source="slug" required />
    <TextInput source="title" />
    <TextInput source="description" multiline />
  </>
);

export const ProductEdit = (props) => (
  <Edit title="Product" {...props} undoable={false}>
    <SimpleForm variant="outlined">{renderForm()}</SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create title="Create a Product" {...props}>
    <SimpleForm>{renderForm(true)}</SimpleForm>
  </Create>
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
