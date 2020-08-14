import slate from "@react-page/plugins-slate";
import React from "react";
import styled from "styled-components";

//import pageLink from "./pageLink";
import externalLink from "./externalLink";
import fileLink from "./fileLink";
import { selectFont } from "../../../utils/themeUtils";
import Heading from "../../layout/components/Heading";
import Paragraph from "../../layout/components/Paragraph";

const LI = styled.li`
  margin-left: 25px;
  ${selectFont("fontText")};
`;

const UL = styled.ul`
  list-style-type: disc;
  margin-bottom: 1.5em;
`;

const OL = styled.ol`
  list-style-type: decimal;
  margin-bottom: 1.5em;
`;

const H1 = styled(Heading).attrs({ level: 1 })``;

const H2 = styled(Heading).attrs({ level: 2 })``;
const H3 = styled(Heading).attrs({ level: 3 })``;
export const defaultSlate = slate((f) => ({
  ...f,
  plugins: {
    emphasize: f.plugins.emphasize,
    headings: {
      h1: f.plugins.headings.h1((d) => ({
        ...d,
        Component: H1,
      })),
      h2: f.plugins.headings.h2((d) => ({
        ...d,
        Component: H2,
      })),
      h3: f.plugins.headings.h3((d) => ({
        ...d,
        Component: H3,
      })),
    },
    paragraphs: {
      paragraph: f.plugins.paragraphs.paragraph((d) => ({
        ...d,
        Component: Paragraph,
      })),
    },
    lists: {
      ul: f.plugins.lists.ul({
        customizeList: (d) => ({
          ...d,
          Component: UL,
        }),
        customizeListItem: (d) => ({
          ...d,
          Component: LI,
        }),
      }),
      ol: f.plugins.lists.ol({
        customizeList: (d) => ({
          ...d,
          Component: OL,
        }),
        customizeListItem: (d) => ({
          ...d,
          Component: LI,
        }),
      }),
    },
    alignment: f.plugins.alignment,
    quotes: f.plugins.quotes,
    link: {
      externalLink,
      // pageLink,
      fileLink,
    },
  },
}));
