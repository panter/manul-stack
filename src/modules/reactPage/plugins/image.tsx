import { createContentPlugin } from "@react-page/create-plugin-materialui";
import Image, {
  ASPECT_RATIOS,
  ImageProps,
} from "../../content/components/Image";
import dynamic from "next/dynamic";

const ImageField = dynamic({
  loader: () => import("../components/ImageField"),
  ssr: false,
});

const image = createContentPlugin<ImageProps>({
  name: "image",
  version: "1.0.0",
  text: "image",
  description: "image",
  isInlineable: true,
  controlsLayout: {
    columnCount: 3,
  },
  Renderer: (props) => <Image {...props.state} />,
  schema: {
    required: ["imageUrl"],
    properties: {
      imageUrl: {
        type: "string",
        uniforms: {
          component: ImageField,
          accept: "image/*",
        },
      },
      aspectRatio: {
        type: "string",
        enum: ASPECT_RATIOS,
        default: "auto",
      },
      crop: {
        type: "boolean",
        default: true,
      },
      align: {
        type: "string",
        enum: ["left", "center", "right"],
        default: "left",
      },
      maxWidth: {
        type: "number",
      },

      externalUrl: {
        type: "string",
      },
      altText: {
        type: "string",
      },
    },
  },
});

export default image;
