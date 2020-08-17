import { pluginFactories } from "@react-page/plugins-slate";
import dynamic from "next/dynamic";
import React from "react";

import StyledLink from "../../layout/components/StyledLink";

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
    <StyledLink external href={props.href} title={props.title}>
      {props.children}
    </StyledLink>
  ),
});
