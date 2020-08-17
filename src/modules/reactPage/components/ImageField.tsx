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
          const { data } = await upload({
            variables: { file, fileName, folderName: "content/images" },
          });
          onChange(data?.adminUploadFile);
        } else {
          onChange(null);
        }
      }}
    />
  );
});

export default ImageField;
