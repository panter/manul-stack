import React from "react";
// import { action } from "@storybook/addon-actions";
import Image from "../Image";

export default {
  component: Image,
  title: "content/Image",
};

export const defaultView = () => (
  <Image imageUrl="https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" />
);
