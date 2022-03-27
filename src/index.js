import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { MetaMaskProvider } from './hooks/MetaMask';
import './polyfill';
import { Buffer } from 'buffer';
import { WalletConnectProvider } from "./hooks/WalletConnect";


const getLibrary = (provider, connector) => {
    return new Web3(provider)
}


ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={ getLibrary }>
            <WalletConnectProvider>
                <MetaMaskProvider>
                    <Suspense fallback={<span>Loading...</span>}>
                        <App/>
                    </Suspense>
                </MetaMaskProvider>
            </WalletConnectProvider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
