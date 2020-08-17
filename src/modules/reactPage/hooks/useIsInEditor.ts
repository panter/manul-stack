import { useContext } from "react";
import InEditorContext from "../../admin/inputs/contentEditor/InEditorContext";
const useIsInEditor = () => {
  return useContext(InEditorContext);
};

export default useIsInEditor;
