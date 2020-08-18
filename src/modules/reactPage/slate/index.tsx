import slate from "@react-page/plugins-slate";
import React from "react";
import styled from "styled-components";

import pageLink from "./pageLink";
import externalLink from "./externalLink";
import fileLink from "./fileLink";
import { selectFont } from "../../../utils/themeUtils";

import { Typography } from "@material-ui/core";

export const defaultSlate = slate((f) => ({
  ...f,
  plugins: {
    emphasize: f.plugins.emphasize,
    headings: {
      h1: f.plugins.headings.h1((d) => ({
        ...d,
        Component: ({ attributes, style, children }) => (
          <Typography
            variant="h1"
            {...attributes}
            style={style}
            children={children}
            gutterBottom
          />
        ),
      })),
      h2: f.plugins.headings.h2((d) => ({
        ...d,
        Component: ({ attributes, style, children }) => (
          <Typography
            variant="h2"
            {...attributes}
            style={style}
            children={children}
            gutterBottom
          />
        ),
      })),
      h3: f.plugins.headings.h3((d) => ({
        ...d,
        Component: ({ attributes, style, children }) => (
          <Typography
            variant="h3"
            {...attributes}
            style={style}
            children={children}
            gutterBottom
          />
        ),
      })),
      h4: f.plugins.headings.h4((d) => ({
        ...d,
        Component: ({ attributes, style, children }) => (
          <Typography
            variant="h4"
            {...attributes}
            style={style}
            children={children}
            gutterBottom
          />
        ),
      })),
    },
    paragraphs: {
      paragraph: f.plugins.paragraphs.paragraph((d) => ({
        ...d,
        Component: ({ attributes, style, children }) => (
          <Typography
            {...attributes}
            style={style}
            children={children}
            gutterBottom
          />
        ),
      })),
    },
    lists: f.plugins.lists,
    alignment: f.plugins.alignment,
    quotes: f.plugins.quotes,
    link: {
      externalLink,
      pageLink,
      fileLink,
    },
  },
}));
