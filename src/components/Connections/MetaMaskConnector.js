import { InjectedConnector } from '@web3-react/injected-connector';


export const injectedMetaMask = new InjectedConnector({
    supportedChainIds: [ 1, 56 ]
});