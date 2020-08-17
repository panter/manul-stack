import get from "lodash/get";
import isFunction from "lodash/isFunction";
import isNumber from "lodash/isNumber";
import {
  Color,
  Font,
  Size,
  ThemeGroup,
  ThemeKeyOrFunc,
  ThemeKeySelector,
  TransformFunc,
  Misc,
} from "../config/theme";

export const select = <T extends string>(
  group: ThemeGroup,
  themeKeyOrFunc: ThemeKeyOrFunc<T>,
  transform: TransformFunc = null
) => (props: any) => {
  let transformFunc = null;
  const theme = props.theme;

  if (transform) {
    if (isNumber(transform)) {
      transformFunc = (v: any) => (transform as number) * v;
    } else if (isFunction(transform)) {
      transformFunc = transform;
    } else {
      // eslint-disable-next-line no-console
      console.warn("transform has to be function or number");
    }
  }

  const themeKey = isFunction(themeKeyOrFunc)
    ? (themeKeyOrFunc as ThemeKeySelector<T>)(props)
    : themeKeyOrFunc;

  const value = get(theme[group], themeKey, themeKey);
  if (transformFunc) {
    return transformFunc(value);
  }
  return value;
};

export const selectColor = (
  themeKeyOrFunc: ThemeKeyOrFunc<Color>,
  transform?: TransformFunc
) => select("colors", themeKeyOrFunc, transform);

export const selectSize = (
  themeKeyOrFunc: ThemeKeyOrFunc<Size>,
  transform?: TransformFunc
) => select("sizes", themeKeyOrFunc, transform);

export const selectFont = (
  themeKeyOrFunc: ThemeKeyOrFunc<Font>,
  transform?: TransformFunc
) => select("fonts", themeKeyOrFunc, transform);

export const selectMisc = (
  themeKeyOrFunc: ThemeKeyOrFunc<Misc>,
  transform?: TransformFunc
) => select("misc", themeKeyOrFunc, transform);
