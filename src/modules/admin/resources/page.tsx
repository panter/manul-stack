import React from "react";
import {
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  Filter,
  FormTab,
  List,
  NumberInput,
  Resource,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  SaveButton,
} from "react-admin";
import { Button } from "@material-ui/core";
import I18nTextInput from "../inputs/I18nTextInput";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PageSelectInput from "../inputs/PageSelectInput";
import PageIcon from "@material-ui/icons/MenuBook";
import ContentEditorInput from "../inputs/contentEditor/ContentEditorInput";
import EditToolbar from "../layout/EditToolbar";
import PageLink from "../../layout/components/PageLink";
import { useRouter } from "next/router";
import usePageLink from "../../layout/hooks/usePageLink";

const PageFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Path" source="path" alwaysOn />
  </Filter>
);

const PageList = (props: any) => (
  <List
    {...props}
    filters={<PageFilter />}
    perPage={20}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="path" />

      <EditButton />
    </Datagrid>
  </List>
);

const PageTitle = ({ record }: any) => {
  return <span>Page {record ? `"${record.htmlTitle}"` : ""}</span>;
};

export const PageEdit = (props: any) => {
  const link = usePageLink({ pageId: props.id });

  const router = useRouter();
  return (
    <Edit title={<PageTitle />} {...props} undoable={false}>
      <TabbedForm
        variant="outlined"
        toolbar={
          <EditToolbar
            additionalSaveAction={{
              label: "Save and View",
              onSuccess: () =>
                link ? router.push(link?.href, link?.as) : null,
            }}
          />
        }
      >
        <FormTab label="summary">
          <BooleanInput source="published" />
          <TextInput source="slug" />
          <I18nTextInput source="navigationTitle" />
          <PageSelectInput label="Parent page" source="parentPage" />
          <NumberInput source="sortKey" />
        </FormTab>

        <FormTab label="content">
          <ContentEditorInput source="content" />
        </FormTab>
        <FormTab label="SEO & Social">
          <I18nTextInput source="htmlTitle" />
          <I18nTextInput multiline fullWidth source="meta_description" />

          <I18nTextInput source="social_title" />
          <I18nTextInput source="social_description" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
const PageCreate = (props: any) => (
  <Create title="Create a Page" {...props}>
    <SimpleForm>
      <BooleanInput source="published" />
      <TextInput source="slug" />
      <I18nTextInput source="navigationTitle" />
      <PageSelectInput label="Parent page" source="parentPage" />
      <NumberInput source="sortKey" />
    </SimpleForm>
  </Create>
);

export default () => (
  <Resource
    name="Page"
    icon={PageIcon}
    list={PageList}
    edit={PageEdit}
    create={PageCreate}
  />
);
