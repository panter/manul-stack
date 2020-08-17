import { connectField } from "uniforms";
import PageSelectInput from "../inputs/PageSelectInput";

const PageIdSelector = connectField(({ value, onChange }) => {
  return (
    <PageSelectInput
      meta={{}}
      input={{
        value,
        onFocus: () => null,
        onBlur: () => null,
        onChange: (value) => {
          onChange(value);
        },
      }}
    />
  );
});

export default PageIdSelector;
