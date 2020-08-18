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

const RoleList = (props) => (
  <List {...props} perPage={20}>
    <Datagrid>
      <TextField source="id" />

      <EditButton />
    </Datagrid>
  </List>
);

const renderForm = (isCreate = false) => (
  <>
    <TextInput source="id" readonly />
    <ReferenceArrayInput
      label="Users"
      source="users"
      reference="User"
      allowEmpty
      alwaysOn
    >
      <SelectArrayInput optionText="email" />
    </ReferenceArrayInput>
  </>
);

const RoleEdit = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm variant="outlined">{renderForm()}</SimpleForm>
  </Edit>
);

const RoleCreate = (props) => (
  <Create title="Create a Role" {...props}>
    <SimpleForm>{renderForm(true)}</SimpleForm>
  </Create>
);
const resource = () => (
  <Resource
    name="UserRole"
    list={RoleList}
    edit={RoleEdit}
    create={RoleCreate}
  />
);
export default resource;
