import { useCallback } from 'react';
import styled from 'styled-components';
import { PopUp } from './PopUp';
import MetaMaskLogo from '../../assets/svg/metamask.svg';
import WalletConnectLogo from '../../assets/svg/walletconnect.svg';
import ContinueIcon from '../../assets/imgs/continue.png';


const StyledConnectButton = styled.div`
    display: flex;
    gap: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 10px;
    width: 300px;
    cursor: pointer;
    border-radius: 15px;
    transition: .05s ease;
    margin-bottom: 10px;
    & img {
        height: 30px;
    }
    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
    &:hover ._btnContinue img {
        opacity: .5;
    }
    & ._btnContinue {
        height: 100%;
        flex-grow: 1;
        & img {
            float: right;
            opacity: 0;
            transition: .05s ease;
        }
    }
`;


export const WalletConnectPopUp = ({ visible, onClose, onConnect }) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [ onClose ]);

    const handleConnect = useCallback(wallet => {
        onConnect(wallet);
    }, [ onConnect ]);

    return <PopUp label="Track Wallet" visible={ visible } onClose={ handleClose }>
        <StyledConnectButton onClick={ () => handleConnect('MetaMask') }>
            <img alt="MetaMask" src={ MetaMaskLogo }/>
            <div>MetaMask</div>
            <div className="_btnContinue">
                <img alt="Continue" src={ ContinueIcon }></img>
            </div>
        </StyledConnectButton>
        <StyledConnectButton onClick={ () => handleConnect('WalletConnect') }>
            <img alt="WalletConnect" src={ WalletConnectLogo }/>
            <div>WalletConnect</div>
            <div className="_btnContinue">
                <img alt="Continue" src={ ContinueIcon }></img>
            </div>
        </StyledConnectButton>
    </PopUp>
}