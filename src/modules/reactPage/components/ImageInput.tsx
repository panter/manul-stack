import FileInput from "./FileInput";
import { File } from "aws-sdk/lib/dynamodb/document_client";

export interface ImageInputProps {
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  value?: string;
  onChange: (v: File, fileName?: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  style,
  className,
  name,
  value,
  onChange,
}) => {
  return (
    <FileInput
      value={value}
      style={style}
      className={className}
      name={name}
      accept="image/*"
      onChange={async (file) => {
        if (file) {
          const config = {
            quality: 0.7,
            maxWidth: 1680,
            maxHeight: 1680,
            autoRotate: true,
          };

          const shouldResize = file.size > 512 * 1024;
          const resizedFile = shouldResize
            ? await import("browser-image-resizer").then((r) =>
                r.readAndCompressImage(file, config)
              )
            : file;

          onChange(resizedFile, file.name);
        } else {
          onChange(null, null);
        }
        return;
      }}
    />
  );
};

export default ImageInput;
