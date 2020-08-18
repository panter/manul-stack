import { connectField } from "uniforms";
import TagSelectInput from "../../admin/inputs/TagSelectInput";

const ProductTagSelector = connectField(({ value, onChange }) => {
  return (
    <TagSelectInput
      meta={{}}
      input={{
        value,
        onFocus: () => null,
        onBlur: () => null,
        onChange: (e) => {
          onChange(e.target.value);
        },
      }}
    />
  );
});

export default ProductTagSelector;
