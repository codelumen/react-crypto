import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledLangButtonEng = styled.a`
color: ${(props) => (props.lang === "en" ? "#fff;" : "#817499;")}
  cursor: pointer;
  border-right: 1px solid #817499;
  padding-right: 8px;
  margin-right: 8px;
`;

const StyledLangButtonRus = styled.a`
  color: ${(props) => (props.lang === "ru" ? "#fff;" : "#817499;")}
  cursor: pointer;
`;

const StyledLangGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const LangSelector = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  const changeLanguage = (value) => {
    setLang(value);
    i18n.changeLanguage(value);
  };

  return (
    <StyledLangGroup>
      <StyledLangButtonEng lang={lang} onClick={() => changeLanguage("en")}>
        ENG
      </StyledLangButtonEng>
      <StyledLangButtonRus lang={lang} onClick={() => changeLanguage("ru")}>
        RUS
      </StyledLangButtonRus>
    </StyledLangGroup>
  );
};
