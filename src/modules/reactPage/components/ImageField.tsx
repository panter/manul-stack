import { connectField } from "uniforms";

import { useFileUpload } from "../hooks/useFileUpload";
import ImageInput from "./ImageInput";

const ImageField = connectField(({ value, onChange }) => {
  const [upload] = useFileUpload();
  return (
    <ImageInput
      value={value}
      onChange={async (file, fileName) => {
        if (file) {
          const { data } = await upload({ variables: { file, fileName } });
          onChange(data.uploadToAws);
        } else {
          onChange(null);
        }
      }}
    />
  );
});

export default ImageField;
