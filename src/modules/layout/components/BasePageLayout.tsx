import React from "react";
import styled from "styled-components";
import { Link } from "../../../config/i18n";
import PanterLogo from "../../example/components/PanterLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import PageNavigation from "./PageNavigation";
import StyledLink from "./StyledLink";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  padding: 20px;
`;
export type BasePageLayoutProps = {};

const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children }) => {
  return (
    <Base>
      <a rel="noreferrer" target="_blank" href="https://www.panter.ch">
        <PanterLogo
          css={`
            width: 180px;
          `}
        />
      </a>
      <LanguageSwitcher />
      <Link href="/admin" passHref>
        <StyledLink>Admin Area</StyledLink>
      </Link>

      <PageNavigation />
      {children}
    </Base>
  );
};

export default BasePageLayout;
