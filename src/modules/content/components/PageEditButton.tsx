import React from "react";
import styled from "styled-components";
import { Link } from "../../../config/i18n";
import useMe from "../../user/hooks/useMe";
import { Link as MuiLink } from "@material-ui/core";

export type PageEditButtonProps = {
  style?: React.CSSProperties;
  className?: string;
  pageId: string;
};

const PageEditButton: React.FC<PageEditButtonProps> = ({
  style,
  className,
  pageId,
}) => {
  const { isAdmin } = useMe();
  if (!isAdmin) return null;

  return (
    <Link href="/admin" as={`/admin#/Page/${pageId}/1`} passHref>
      <MuiLink style={style} className={className}>
        Edit page
      </MuiLink>
    </Link>
  );
};

export default PageEditButton;
