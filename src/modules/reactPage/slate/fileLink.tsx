import { pluginFactories } from "@react-page/plugins-slate";
import dynamic from "next/dynamic";
import React from "react";

import StyledLink from "../../layout/components/StyledLink";

import Icon from "@material-ui/icons/AttachFile";
const FileField = dynamic({
  loader: () => import("../components/FileField"),
  ssr: false,
});

export default pluginFactories.createComponentPlugin<{
  fileUrl: string;
}>({
  icon: <Icon />,
  type: "FILE_LINK",
  object: "mark",
  label: "File link",
  addHoverButton: true,
  addToolbarButton: false,
  schema: {
    required: ["fileUrl"],
    type: "object",
    properties: {
      fileUrl: {
        type: "string",
        uniforms: {
          component: FileField,
        },
      },
    },
  },

  Component: (props) => (
    <StyledLink isFile href={props.fileUrl}>
      <span contentEditable={false}>
        <Icon
          style={{
            fontSize: "1.5rem",
            width: "1em",
            height: "1em",
            fill: "currentColor",
          }}
        />{" "}
      </span>
      {props.children}
    </StyledLink>
  ),
});
