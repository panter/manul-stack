import React from "react";
import { Link } from "../../../config/i18n";
import usePageLink, { UsePageLinkProps } from "../hooks/usePageLink";
import StyledLink from "./StyledLink";
import usePreventOnClickInEditor from "../../reactPage/hooks/usePreventOnClickInEditor";

export type PageLinkProps = {
  style?: React.CSSProperties;
  className?: string;
} & UsePageLinkProps;

const PageLink: React.FC<PageLinkProps> = ({
  page,
  pageId,
  path,

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
    return (
      <Link href={href} as={as} passHref onClick={onClick}>
        <StyledLink style={style} className={className}>
          {children || navigationTitle}
        </StyledLink>
      </Link>
    );
  }
};

export default PageLink;
