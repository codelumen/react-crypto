import { useState, useCallback } from 'react';
import styled from "styled-components";
import CloseIcon from '../../assets/imgs/close.png';


const StyledPopUpContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 650;
`;

const StyledPopUpMessage = styled.div`
    position: relative;
    box-sizing: border-box;
    color: white;
    border-radius: 20px;
    padding: 30px;
    background: black;
`;

const StyledPopUpMessageCloseButton = styled.div`
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 6px;
    right: 30px;
    opacity: .5;
    transition: .05s ease;
    & img {
        width: 100%;
        height: 100%;
    }
    &:hover {
        opacity: 1;
    }
`;

const StyledPopUpMessageLabel = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 25px;
`;


export const PopUp = ({ children, label, visible, onClose }) => {
    const handleClose = useCallback(() => {
        onClose(true);
    }, [ onClose ]);

    return <StyledPopUpContainer style={{ display: visible ? 'flex' : 'none' }}>
        <StyledPopUpMessage>
            <StyledPopUpMessageCloseButton onClick={ handleClose }>
                <img src={ CloseIcon } alt="Close"/>
            </StyledPopUpMessageCloseButton>
            <StyledPopUpMessageLabel>{ label }</StyledPopUpMessageLabel>
            { children }
        </StyledPopUpMessage>
    </StyledPopUpContainer>
}