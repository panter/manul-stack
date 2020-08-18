import React from "react";
import { Link } from "../../../config/i18n";
import usePageLink, { UsePageLinkProps } from "../hooks/usePageLink";
import { Link as MuiLink } from "@material-ui/core";
import usePreventOnClickInEditor from "../../reactPage/hooks/usePreventOnClickInEditor";

export type PageLinkProps = {
  style?: React.CSSProperties;
  className?: string;
  Component?: React.ComponentType;
} & UsePageLinkProps;

const PageLink: React.FC<PageLinkProps> = ({
  page,
  pageId,
  path,
  Component,
  style,
  className,
  children,
}) => {
  const onClick = usePreventOnClickInEditor();
  const link = usePageLink({ page, pageId, path });
  if (!link) {
    return (
      <span style={style} className={className}>
        {children}
      </span>
    );
  } else {
    const { href, navigationTitle, as } = link;
    const C = Component ?? MuiLink;
    return (
      <Link href={href} as={as} passHref>
        <C style={style} className={className} onClick={onClick}>
          {children || navigationTitle}
        </C>
      </Link>
    );
  }
};

export default PageLink;
