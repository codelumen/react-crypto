import React from "react";
import { ReactComponent as SelectArrow } from "../../assets/svg/select-arrow.svg";
import styled from "styled-components";

const StyledItemContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const StyledNavItemText = styled.a`
  cursor: pointer;
  &:hover {
    color: #ffff14;
  }
`;

export const NavigationItem = ({ text, isSelect }) => {
  if (isSelect) {
    return (
      <StyledItemContainer>
        <StyledNavItemText style={{ marginRight: "7px" }}>
          {text}
        </StyledNavItemText>
        <SelectArrow />
      </StyledItemContainer>
    );
  } else {
    return (
      <StyledItemContainer>
        <StyledNavItemText>{text}</StyledNavItemText>
      </StyledItemContainer>
    );
  }
};
