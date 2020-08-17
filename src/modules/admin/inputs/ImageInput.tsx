import ImageInputRaw from "../../reactPage/components/ImageInput";
import { useInput } from "react-admin";
import { useFileUpload } from "../../reactPage/hooks/useFileUpload";

const ImageInput = (props) => {
  const {
    input: { value, onChange },
  } = useInput(props);
  const [upload] = useFileUpload();

  return (
    <ImageInputRaw
      value={value}
      onChange={async (file) => {
        const { data } = await upload({
          variables: {
            folderName: "content/images",
            file,
          },
        });

        onChange(data?.adminUploadFile);
      }}
    />
  );
};

export default ImageInput;
