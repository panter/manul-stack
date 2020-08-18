import { pluginFactories } from "@react-page/plugins-slate";
import dynamic from "next/dynamic";
import React from "react";
import { Link as MuiLink } from "@material-ui/core";

const Icon = dynamic({
  loader: () => import("@material-ui/icons/ExitToApp"),
});

export default pluginFactories.createComponentPlugin<{
  href: string;
  title?: string;
}>({
  icon: <Icon />,
  type: "EXTERNAL_LINK",
  object: "mark",
  label: "External link",
  addHoverButton: true,
  addToolbarButton: false,
  schema: {
    required: ["href"],
    type: "object",
    properties: {
      href: {
        type: "string",
      },
      title: {
        type: "string",
      },
    },
  },

  Component: (props) => (
    <MuiLink
      target="_blank"
      rel="noreferrer"
      href={props.href}
      title={props.title}
    >
      {props.children}
    </MuiLink>
  ),
});
