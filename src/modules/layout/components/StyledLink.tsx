import styled from "styled-components";

import { selectColor } from "../../../utils/themeUtils";

const StyledLink = styled.a.attrs(
  ({ external, isFile, email, href, ...props }: any) => ({
    ...((external || isFile || email) && {
      rel: "noreferrer noopener",
      target: "_blank",
    }),
    href: email ? `mailto:${email}` : href,

    ...props,
  })
)`
  color: ${selectColor("primary")};
  &:hover {
    text-decoration: underline;
  }
  vertical-align: text-bottom;
`;

export default StyledLink;
