import React from "react";
// import { action } from "@storybook/addon-actions";
import Paragraph from "../Paragraph";

export default {
  component: Paragraph,
  title: "layout/Paragraph",
};

export const defaultView = () => (
  <Paragraph>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua.{" "}
  </Paragraph>
);
