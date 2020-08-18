import { SelectInput, ReferenceInput } from "react-admin";

const TagSelectInput = (props) => (
  <ReferenceInput reference="ProductTag" label="Tags" {...props}>
    <SelectInput optionText="title" />
  </ReferenceInput>
);

export default TagSelectInput;
