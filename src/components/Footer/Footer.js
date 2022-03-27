import React from "react";
import styled from "styled-components";
import { NavigationItem } from "../Navigation-item/Navigation-item";
import { useTranslation } from "react-i18next";
import { ReactComponent as NavDevider } from "../../assets/svg/nav-devider.svg";
import { LangSelector } from "../Lang-selector/Lang-selector";
const StyledCopyright = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: #817499;
`;
const StyledNavDevider = styled(NavDevider)`
  margin: 0 16px;
`;
const StyledFooterMenuContainer = styled.div`
  margin: 0 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;
const StyledFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooterContainer>
      <StyledCopyright>©Metoshi, 2021</StyledCopyright>
      <StyledFooterMenuContainer>
        <NavigationItem isSelect={true} text={t("PRODUCT")} />
        <StyledNavDevider />
        <NavigationItem text={t("FINANCE")} />
        <StyledNavDevider />
        <NavigationItem text={t("MARKETPLACE")} />
        <StyledNavDevider />
        <NavigationItem text={t("COMICS")} />
        <StyledNavDevider />
        <NavigationItem text={t("MEMES")} />
        <StyledNavDevider />
        <NavigationItem text={t("WHITEPAPER")} />
        <StyledNavDevider />
        <NavigationItem text={t("CONTACTS")} />
      </StyledFooterMenuContainer>
      <LangSelector />
    </StyledFooterContainer>
  );
};
