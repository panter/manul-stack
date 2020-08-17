import React from "react";
import styled from "styled-components";

import { useTranslation, SUPPORTED_LANGS } from "../../../config/i18n";
import { selectColor, selectFont } from "../../../utils/themeUtils";

const LanguageSwitcherItem = styled.a<{ isLast: boolean; isCurrent: boolean }>`
  ${(p) => !p.isLast && "border-right: 1px solid"};
  padding-right: 10px;
  margin-left: 10px;
  display: "inline-block";
  text-decoration: none;

  color: ${selectColor((p) => (p.isCurrent ? "black" : "primary"))};
  cursor: ${(p) => (p.isCurrent ? "normal" : "pointer")};
  ${selectFont("fontText")};
`;

type LanguageSwitcherProps = {};
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      {SUPPORTED_LANGS.map((language, index) => (
        <LanguageSwitcherItem
          key={language}
          onClick={() => i18n.changeLanguage(language)}
          isLast={index === SUPPORTED_LANGS.length - 1}
          isCurrent={language === i18n.language}
        >
          {language}
        </LanguageSwitcherItem>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
