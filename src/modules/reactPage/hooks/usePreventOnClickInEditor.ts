import useIsInEditor from "./useIsInEditor";

const usePreventOnClickInEditor = () => {
  const isInEditor = useIsInEditor();
  return isInEditor ? (e) => e.preventDefault() : undefined;
};

export default usePreventOnClickInEditor;
