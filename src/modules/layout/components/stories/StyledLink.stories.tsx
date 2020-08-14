import { storiesOf } from "@storybook/react"; // tslint:disable-line:no-implicit-dependencies
import React from "react";
// import { action } from "@storybook/addon-actions";
import StyledLink from "../StyledLink";

export default {
  component: StyledLink,
  title: "layout/StyledLink",
};

export const defaultView = () => (
  <StyledLink href="https://www.panter.ch">Link</StyledLink>
);
