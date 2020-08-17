import { useRouter } from "next/router";
import ContentPage from "../../src/modules/content/components/ContentPage";

const Content = () => {
  const { query } = useRouter();
  const subpath = query.subpath as string;

  let path = "/";
  if (Array.isArray(query.path)) {
    const fullPath =
      query.path[0] == subpath ? query.path.slice(1) : query.path;
    path = `/${fullPath.join("/")}`;
  } else {
    path = query.path as string;
  }

  return <ContentPage path={path} />;
};

export default Content;
