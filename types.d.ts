declare module "react-rectangle" {
  import React from "react";

  export = class Rectangle extends React.Component<{
    style?: React.Properties;
    aspectRatio:
      | number
      | string
      | [number, number]
      | [string, string]
      | string[]
      | number[];
  }> {};
}
