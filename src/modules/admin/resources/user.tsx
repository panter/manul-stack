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
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Email" source="email" alwaysOn />
    <ReferenceInput
      label="Role"
      source="roles"
      reference="UserRole"
      allowEmpty
      alwaysOn
    >
      <SelectInput optionText="id" />
    </ReferenceInput>
  </Filter>
);

const UserList = (props) => (
  <List {...props} filters={<UserFilter />} perPage={20}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }: any) => {
  return <span>User {record ? `"${record.email}"` : ""}</span>;
};

const renderForm = (isCreate = false) => (
  <>
    <TextInput source="email" />
    <ReferenceInput
      label="Role"
      source="roles"
      reference="UserRole"
      allowEmpty
      alwaysOn
    >
      <SelectInput optionText="id" />
    </ReferenceInput>
  </>
);

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props} undoable={false}>
    <SimpleForm variant="outlined">{renderForm()}</SimpleForm>
  </Edit>
);

const UserCreate = (props) => (
  <Create title="Create a User" {...props}>
    <SimpleForm>{renderForm(true)}</SimpleForm>
  </Create>
);
const userResource = () => (
  <Resource name="User" list={UserList} edit={UserEdit} create={UserCreate} />
);
export default userResource;
