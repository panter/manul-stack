import { SelectInput, ReferenceInput } from "react-admin";

const TagSelectInput = (props) => (
  <ReferenceInput reference="ProductTag" label="Tags" allowEmpty {...props}>
    <SelectInput optionText="title" />
  </ReferenceInput>
);

export default TagSelectInput;
