import React, { useState, useCallback, useEffect } from "react";
import { Navigation } from "./components";
import { Finance } from "./pages/Finance/Finance";
import styled from "styled-components";
import BgLeft from "./assets/imgs/bg-left.png";
import BgRight from "./assets/imgs/bg-right.png";
import BgTop from "./assets/imgs/bg-top.png";
import { Footer } from "./components/Footer/Footer";
import { WalletConnectPopUp } from "./components/PopUp/WalletConnect";
import { useMetaMask } from './hooks/MetaMask';
import { useWalletConnect } from "./hooks/WalletConnect";
import { StakePopUp } from "./components/PopUp/Stake";
import { SC } from './SmartContracts';
import { walletConnectProvider } from "./components/Connections/WalletConnectConnector";


const StyledAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #150633;
  position: relative;
  z-index: 1;
  @media (max-width: 1110px) {
    height: 100%;
  }
`;

const StyledAppContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 32px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const StyledFooterContainer = styled.div`
  max-width: 1920px;
  padding: 25px;
  margin: 0 auto;
`;

const StyledBgDecL = styled.div`
  background: url(${BgLeft});
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: -60px;
  width: 779px;
  height: 1020px;
  z-index: -1;
  @media (max-width: 875px) {
    width: 610px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const StyledBgDecR = styled.div`
  background: url(${BgRight});
  position: absolute;
  content: "";
  right: 0;
  top: 90px;
  width: 570px;
  height: 869px;
  z-index: -1;
  @media (max-width: 875px) {
    width: 300px;
  }
`;
const StyledBgDecT = styled.div`
  background: url(${BgTop});
  background-repeat: no-repeat;
  position: absolute;
  right: 100px;
  width: 982px;
  height: 388px;
  z-index: -1;
`;


const networks = {
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
};

const changeNetwork = async ({ networkName, setError }) => {
    try {
        if (window.ethereum) {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName]
                    }
                ]
            });
        }
        if (walletConnectProvider) {
            await walletConnectProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName]
                    }
                ]
            })
        }
    } catch (err) {
        setError(err.message);
    }
}

changeNetwork({ networkName: 'bsc', setError: console.log });



function App() {
    let [ needToApprove, setNeedToApprove ] = useState(false);

    let [ popUpVisible, setPopUpVisibility ] = useState(false);
    let [ stakePopUpVisible, setStakePopUpVisibility ] = useState(false);

    let { Mconnect, MisActive, Maccount } = useMetaMask();
    let { Wconnect, WisActive, Waccount } = useWalletConnect();
    let [ account, setAccount ] = useState(false);
    let [ active, setActive ] = useState(false);
    let [ stakingVersion, setStakingVersion ] = useState("1");
    let [ walletType, setWalletType ] = useState(null);

    let [ update, setUpdate ] = useState(false);

    if (walletType && (Maccount || Waccount) && !account) {
        if (walletType === 'MetaMask') {
            setAccount(Maccount);
            setNeedToApprove(true);
        } else if (walletType === 'WalletConnect') {
            setAccount(Waccount);
            setNeedToApprove(true);
        }
    }

    if ((MisActive || WisActive) && !active) {
        setActive(true);
    }


    let stake = useCallback(async amount => {
        if (stakingVersion === "1") {
            await SC.stake(account, amount);
        } else if (stakingVersion === "2") {
            await SC.stakeV2(account, amount);
        }
    });


    return (
        <StyledAppWrapper>
            <StakePopUp visible={stakePopUpVisible} inStake={ stakingVersion === "1" ? SC.inStake : SC.inStakeV2 } onClose={v => setStakePopUpVisibility(false)} onConfirm={
                async amount => {
                    await stake(amount);
                    setStakePopUpVisibility(false);
                    setUpdate(true);
                }
            }>
            </StakePopUp>
            <WalletConnectPopUp visible={ active ? !active : popUpVisible } onClose={v => setPopUpVisibility(false)} onConnect={
                async wallet => {
                    if (wallet === 'MetaMask') {
                        await Mconnect();
                        await SC.init(window.ethereum);
                    } else if (wallet === 'WalletConnect') {
                        await Wconnect();
                        await SC.init(walletConnectProvider);
                    }
                    setWalletType(wallet);
                }
            }></WalletConnectPopUp>
            <StyledBgDecR></StyledBgDecR>
            <StyledBgDecL></StyledBgDecL>
            <StyledBgDecT></StyledBgDecT>
            <StyledAppContainer>
                <Navigation />
                <Finance
                    update={ update }
                    account={ account }
                    onUseConnection={ () => setPopUpVisibility(true) }
                    onStake={ () => { setStakePopUpVisibility(true); setStakingVersion("1") } }
                    onStakeV2={ () => { setStakePopUpVisibility(true); setStakingVersion("2") } }
                    needToApprove={ needToApprove }
                />
            </StyledAppContainer>
            <div>
                <hr style={{ opacity: "0.1", marginTop: "100px" }} />
                <StyledFooterContainer>
                    <Footer />
                </StyledFooterContainer>
            </div>
        </StyledAppWrapper>
    );
}

export default App;
