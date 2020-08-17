import { pluginFactories } from "@react-page/plugins-slate";
import dynamic from "next/dynamic";
import React from "react";
import PageLink from "../../layout/components/PageLink";

const PageIdSelector = dynamic({
  loader: () => import("../components/PageIdSelector"),
  ssr: false,
});

const LinkIcon = dynamic({
  loader: () => import("@material-ui/icons/Link"),
});

export default pluginFactories.createComponentPlugin<{
  pageId: string;
}>({
  icon: <LinkIcon />,
  type: "PAGE_LINK",
  object: "mark",
  label: "Page link",
  addHoverButton: true,
  addToolbarButton: false,
  schema: {
    required: ["pageId"],
    type: "object",
    properties: {
      pageId: {
        type: "string",
        uniforms: {
          component: PageIdSelector,
        },
      },
    },
  },
  getInitialData: () => ({
    type: "inline",
    pageId: null,
  }),
  Component: (props) => (
    <PageLink pageId={props.pageId}>{props.children}</PageLink>
  ),
});
