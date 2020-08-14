import React from "react";
import styled from "styled-components";
import { selectFont } from "../../../utils/themeUtils";

const Paragraph = styled.p`
  ${selectFont("fontText")};
  margin-bottom: 1.5em;
  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
`;

export default Paragraph;
