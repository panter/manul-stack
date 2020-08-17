import React from "react";
// import { action } from "@storybook/addon-actions";
import ContentPage from "../ContentPage";

export default {
  component: ContentPage,
  title: "content/ContentPage",
};

export const defaultView = () => <ContentPage path="/some" />;
