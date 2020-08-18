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
  SelectArrayInput,
  ReferenceArrayInput,
  required,
} from "react-admin";

import ImageInput from "../inputs/ImageInput";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Slug" source="slug" alwaysOn />
  </Filter>
);

const ProductTitle = ({ record }: any) => {
  return <span>Product {record ? `"${record.slug}"` : ""}</span>;
};

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
    <TextInput source="slug" validate={required()} />
    <TextInput source="title" validate={required()} />
    <ImageInput source="imageUrl" validate={required()} />
    <ReferenceArrayInput
      label="Tags"
      source="tags"
      reference="ProductTag"
      allowEmpty
      alwaysOn
    >
      <SelectArrayInput optionText="title" />
    </ReferenceArrayInput>
  </>
);

export const ProductEdit = (props) => (
  <Edit title={<ProductTitle />} {...props} undoable={false}>
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
