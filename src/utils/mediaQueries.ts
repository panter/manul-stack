import { css } from "styled-components";

export const SIZES = {
  desktop: 992, // TODO
  tablet: 608, // TODO
};
type Sizes = typeof SIZES;
type Media = keyof Sizes;
// Iterate through the sizes and create a media template
type MediaQueries = {
  [key in keyof Sizes]: any;
};
const mediaqueries = (Object.keys(SIZES) as Media[]).reduce((acc, label) => {
  acc[label] = (first: any, ...args: any[]) => css`
    @media (min-width: ${SIZES[label] / 16}em) {
      ${css(first, ...args)}
    }
  `;
  return acc;
}, {} as MediaQueries);

export default mediaqueries;

export const ie11 = (first: any, ...args: any[]) => css`
  @media screen and (-ms-high-contrast: active),
    screen and (-ms-high-contrast: none) {
    ${css(first, ...args)}
  }
`;
