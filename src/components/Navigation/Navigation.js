import React, { useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import { NavigationItem } from "../Navigation-item/Navigation-item";
import styled from "styled-components";
import Whitelisted from "../../assets/imgs/get-whitelisted.png";
import { ReactComponent as NavDevider } from "../../assets/svg/nav-devider.svg";
import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { LangSelector } from "../Lang-selector/Lang-selector";
import { useTranslation } from "react-i18next";

const StyledNavContainer = styled.div`
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1240px) {
    display: none;
  }
`;

const StyledGetWhitelistedButton = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 24px;
  color: #fff;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-left: 24px;
`;

const StyledGetWhitelistedIcon = styled.img`
  margin-left: 12px;
`;

const StyledNavDevider = styled(NavDevider)`
  margin: 0 16px;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;
const StyledBurger = styled.div`
  z-index: 1900;
  display: none;
  span {
  }
  @media (max-width: 1240px) {
    display: block;
  }
`;

export const Navigation = ({ handleBurgerClick }) => {
  const { t } = useTranslation();

  return (
    <StyledNavContainer>
      <StyledBurger>
        <Burger />
      </StyledBurger>
      <div>
        <img src={Logo} alt="METOSHI"></img>
      </div>
      <StyledNavMenuContainer>
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
      </StyledNavMenuContainer>
      <StyledButtonGroup>
        <LangSelector />
        <div>
          <StyledGetWhitelistedButton>
            {t("BUTTON_TITLE")}{" "}
            <StyledGetWhitelistedIcon src={Whitelisted} alt="" />
          </StyledGetWhitelistedButton>
        </div>
      </StyledButtonGroup>
    </StyledNavContainer>
  );
};
