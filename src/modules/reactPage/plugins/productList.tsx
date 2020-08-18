import { createContentPlugin } from "@react-page/create-plugin-materialui";
import ProductPage from "../../product/components/ProductPage";
import ProductTagSelector from "../components/ProductTagSelector";

type Props = {
  tagId: string;
};

const productList = createContentPlugin<Props>({
  name: "productList",
  version: "1.0.0",
  text: "Product List",
  description: "A List of all products",
  schema: {
    required: ["tagId"],
    properties: {
      tagId: {
        type: "string",
        uniforms: {
          component: ProductTagSelector,
        },
      },
    },
  },

  Renderer: (props) => <ProductPage tagId={props.state.tagId} />,
});

export default productList;
