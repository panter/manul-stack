import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FileUpload, FileUploadVariables } from "./types/FileUpload";

const MUTATION = gql`
  mutation FileUpload($file: Upload!, $fileName: String, $folderName: String) {
    adminUploadFile(file: $file, fileName: $fileName, folderName: $folderName)
  }
`;

export const useFileUpload = () => {
  return useMutation<FileUpload, FileUploadVariables>(MUTATION);
};
