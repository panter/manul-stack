import { useRouter } from "next/router";
import ContentPage from "../../src/modules/content/components/ContentPage";
const Content = () => {
  const { query } = useRouter();
  const subpath = query.subpath as string;

  const path = query.path as string[];

  const fullPath = path[0] == subpath ? path.slice(1) : path;

  return <ContentPage path={`/${fullPath.join("/")}`} />;
};

export default Content;
