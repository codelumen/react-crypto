import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as HeaderDevider } from "../../assets/svg/metoshi-underline.svg";
import { StakeItem } from "../../components/StakeItem/Stake-item";

const StyledHeader = styled.h1`
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 115px;
  letter-spacing: 0.02em;
  color: #fff;
  text-align: center;
`;

const StyledMitoshi = styled.span`
  color: #b114ff;
`;

const StyledArrowBack = styled.p`
  color: #fff;
  display: flex;
  align-items: center;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 87.5px;
`;

const StyledStakeItemContainer = styled.div`
  margin-top: 62px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 32px;
  align-items: flex-start;
`;

const StyledHeaderDevider = styled(HeaderDevider)`
  @media (max-width: 875px) {
    display: none;
  } 
`;

export const Finance = ({
    onUseConnection,
    account,
    onStake,
    onStakeV2,
    needToApprove,
    update,
    provider
}) => {
    const { t } = useTranslation();

    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ])

    const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])

    const handleStake2 = useCallback(() => {
        onStakeV2();
  }, [ onStakeV2 ])

    return (
        <div>
            <StyledHeaderContainer>
                <StyledHeader>
                    <StyledMitoshi>Metoshi</StyledMitoshi> Finance{" "}
                </StyledHeader>
                <StyledHeaderDevider />
            </StyledHeaderContainer>
            <StyledStakeItemContainer>
                <StakeItem
                    key="1"
                    version="1"
                    earnedText="METO"
                    activeButton={false}
                    onUseConnection={ handleUseConnection }
                    account={ account }
                    onStake={ handleStake }
                    needToApprove={ needToApprove }
                    update={ update }
                    provider={ provider }
                />
                <StakeItem
                    key="2"
                    version="2"
                    earnedText="METO"
                    activeButton={false}
                    onUseConnection={ handleUseConnection }
                    account={ account }
                    onStake={ handleStake2 }
                    needToApprove={ needToApprove }
                    update={ update }
                    provider={ provider }
                />
            </StyledStakeItemContainer>
        </div>
    );
};
