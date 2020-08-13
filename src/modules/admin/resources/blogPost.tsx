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
  SelectInput,
  ReferenceInput,
  BooleanInput,
  required,
} from "react-admin";

const BlogPostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Email" source="email" alwaysOn />
  </Filter>
);

export const BlogPostList = (props) => (
  <List {...props} filters={<BlogPostFilter />} perPage={20}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

const BlogPostTitle = ({ record }: any) => {
  return <span>BlogPost {record ? `"${record.email}"` : ""}</span>;
};

const renderForm = (isCreate = false) => (
  <>
    <TextInput source="title" validate={required()} />
    <TextInput source="content" validate={required()} />

    <ReferenceInput source="author" reference="User" validate={required()}>
      <SelectInput optionText="email" />
    </ReferenceInput>
    <BooleanInput source="published" />
  </>
);

export const BlogPostEdit = (props) => (
  <Edit title={<BlogPostTitle />} {...props} undoable={false}>
    <SimpleForm variant="outlined">{renderForm()}</SimpleForm>
  </Edit>
);

export const BlogPostCreate = (props) => (
  <Create title="Create a BlogPost" {...props}>
    <SimpleForm>{renderForm(true)}</SimpleForm>
  </Create>
);
const blogPostResource = () => (
  <Resource
    name="BlogPost"
    list={BlogPostList}
    edit={BlogPostEdit}
    create={BlogPostCreate}
  />
);
export default blogPostResource;