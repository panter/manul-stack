import React from "react";
// import { action } from "@storybook/addon-actions";
import Heading from "../Heading";

export default {
  component: Heading,
  title: "layout/Heading",
};

const text = "Hello World";
export const h1 = () => <Heading>{text}</Heading>;
export const h2 = () => <Heading level={2}>{text}</Heading>;
export const h3 = () => <Heading level={3}>{text}</Heading>;
