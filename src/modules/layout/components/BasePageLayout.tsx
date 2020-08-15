import React from "react";
import styled from "styled-components";

import PanterLogo from "../../example/components/PanterLogo";
import { Link } from "../../../config/i18n";
import Heading from "./Heading";
import PageNavigation from "./PageNavigation";
import StyledLink from "./StyledLink";
import LanguageSwitcher from "./LanguageSwitcher";
const ManulStackImg = styled.img.attrs({
  src: "https://i.imgur.com/kwp7cRt.jpg",
})`
  max-width: 320px;
`;

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
      <Heading>Manul stack</Heading>
      <LanguageSwitcher />
      <Link href="/admin" passHref>
        <StyledLink>Admin Area</StyledLink>
      </Link>
      <ManulStackImg />

      <PageNavigation />
      {children}
    </Base>
  );
};

export default BasePageLayout;
