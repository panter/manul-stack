import { connectField } from "uniforms";

import { useFileUpload } from "../hooks/useFileUpload";
import FileInput from "./FileInput";

const FileField = connectField(({ value, onChange }) => {
  const [upload] = useFileUpload();
  return (
    <FileInput
      value={value}
      onChange={async (file) => {
        if (file) {
          const { data } = await upload({ variables: { file } });
          return await onChange(data.uploadToAws);
        } else {
          return await onChange(null);
        }
      }}
    />
  );
});

export default FileField;
