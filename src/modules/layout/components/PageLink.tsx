import React from "react";
import { Link } from "../../../config/i18n";
import usePageLink, { UsePageLinkProps } from "../hooks/usePageLink";
import StyledLink from "./StyledLink";

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
  const link = usePageLink({ page, pageId, path });
  if (!link) {
    return null;
  } else {
    const { href, navigationTitle, as } = link;
    return (
      <Link href={href} as={as} passHref>
        {children || (
          <StyledLink style={style} className={className}>
            {navigationTitle}
          </StyledLink>
        )}
      </Link>
    );
  }
};

export default PageLink;
