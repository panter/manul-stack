import React from "react";

import styled, { css } from "styled-components";
import { selectFont, selectSize } from "../../../utils/themeUtils";

type Level = 1 | 2 | 3;
const HeadingBase = styled.h1<{ level?: Level }>`
  ${selectFont((p) =>
    p.level === 1
      ? "fontHeading"
      : p.level === 2
      ? "fontHeading2"
      : "fontHeading3",
  )};
  margin-bottom: 0.5em;
`;

type HeadingProps = {
  level?: Level;
  style?: React.CSSProperties;
  className?: string;
};
const Heading: React.FC<HeadingProps> = ({
  children,
  style,
  className,
  level = 1,
}) => (
  <HeadingBase
    style={style}
    className={className}
    as={level === 1 ? "h1" : level === 2 ? "h2" : "h3"}
    level={level}
  >
    {children}
  </HeadingBase>
);

export default Heading;
