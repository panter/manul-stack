import { defaultSlate } from "./slate";
import image from "./plugins/image";

export { defaultSlate };

export const plugins = {
  content: [defaultSlate, image()],
  layout: [],
};
