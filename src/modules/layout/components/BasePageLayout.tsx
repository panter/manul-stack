import React from "react";
import PanterLogo from "../../example/components/PanterLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import MainMenu from "./MainMenu";

export type BasePageLayoutProps = {};

const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children }) => {
  return (
    <MainMenu
      header={
        <>
          <a rel="noreferrer" target="_blank" href="https://www.panter.ch">
            <PanterLogo
              css={`
                width: 180px;
              `}
            />
          </a>

          <LanguageSwitcher />
        </>
      }
    >
      {children}
    </MainMenu>
  );
};

export default BasePageLayout;
