import React from "react";
// import { action } from "@storybook/addon-actions";
import PageEditButton from "../PageEditButton";

export default {
  component: PageEditButton,
  title: "content/PageEd;itButton",
};

export const defaultView = () => <PageEditButton pageId="some-page-id" />;
