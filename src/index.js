import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { MetaMask } from './hooks/MetaMask';
import './polyfill';
import { Buffer } from 'buffer';
import { WalletConnect } from "./hooks/WalletConnect";


const getLibrary = (provider, connector) => {
    return new Web3(provider)
}

/**
 * Clears the local storage from previous sessions.
 */
window.onload = () => {
    localStorage.clear();
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={ getLibrary }>
            <WalletConnect>
                <MetaMask>
                    <Suspense fallback={<span>Loading...</span>}>
                        <App/>
                    </Suspense>
                </MetaMask>
            </WalletConnect>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
