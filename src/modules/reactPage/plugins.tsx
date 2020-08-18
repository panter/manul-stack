import { defaultSlate } from "./slate";
import image from "./plugins/image";
import productList from "./plugins/productList";

export { defaultSlate };

export const plugins = {
  content: [defaultSlate, image(), productList()],
  layout: [],
};
