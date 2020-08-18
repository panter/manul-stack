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
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

const ProductTagList = (props) => (
  <List {...props} perPage={20}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />

      <EditButton />
    </Datagrid>
  </List>
);

const renderForm = (isCreate = false) => (
  <>
    <TextInput source="title" />
    <ReferenceArrayInput
      label="Products"
      source="products"
      reference="Product"
      allowEmpty
      alwaysOn
    >
      <SelectArrayInput optionText="title" />
    </ReferenceArrayInput>
  </>
);

const ProductTagEdit = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm variant="outlined">{renderForm()}</SimpleForm>
  </Edit>
);

const ProductTagCreate = (props) => (
  <Create title="Create a Product Tag" {...props}>
    <SimpleForm>{renderForm(true)}</SimpleForm>
  </Create>
);
const resource = () => (
  <Resource
    name="ProductTag"
    list={ProductTagList}
    edit={ProductTagEdit}
    create={ProductTagCreate}
  />
);
export default resource;
