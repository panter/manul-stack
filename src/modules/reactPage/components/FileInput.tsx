import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 12c.6 0 1 .4 1 1v4a1 1 0 001 1h14a1 1 0 001-1v-4a1 1 0 112 0v4a3 3 0 01-3 3H3a3 3 0 01-3-3v-4c0-.6.4-1 1-1zM9.3.3a1 1 0 011.4 0l5 5a1 1 0 01-1.4 1.4L10 2.4 5.7 6.7a1 1 0 01-1.4-1.4l5-5z"
      fill="#50555C"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0c.6 0 1 .4 1 1v12a1 1 0 11-2 0V1c0-.6.4-1 1-1z"
      fill="#50555C"
    />
  </svg>
);

const Fileicon = dynamic({
  loader: () => import("@material-ui/icons/AttachFile"),
});

const NonImagePreview = styled.div`
  border: 1px solid #756f6f;
  border-radius: 5px;
  width: 50px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Base = styled.div`
  padding: 10px;
  border: 1px solid #756f6f;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  break-inside: avoid-column;
`;

export interface FileInputProps {
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  value?: string;
  onChange: (v: File) => Promise<unknown>;
  accept?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  style,
  className,
  name,
  value,
  onChange,
  accept,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      setIsProcessing(true);
      const [file] = acceptedFiles;
      await onChange(file);
      setIsProcessing(false);
    },
    multiple: false,
  });
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [value]);
  return (
    <Base style={style} className={className} {...getRootProps()}>
      <input {...getInputProps()} name={name} />
      {isProcessing ? (
        <p>Please wait....</p>
      ) : isDragActive ? (
        <p>Drop file here...</p>
      ) : (
        <p>
          <Icon /> Upload File
        </p>
      )}
      {value ? (
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={value}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!imageError ? (
              <img
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: 200,
                  paddingBottom: 5,
                }}
                src={value}
                onError={(e) => {
                  setImageError(true);
                }}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <NonImagePreview>
                <Fileicon />
              </NonImagePreview>
            )}
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(null);
            }}
          >
            Löschen
          </button>
        </div>
      ) : null}
    </Base>
  );
};

export default FileInput;
