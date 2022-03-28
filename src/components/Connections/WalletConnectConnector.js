import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';


export const walletConnect = new WalletConnectConnector({
    supportedChainIds: [ 1, 56 ],
    infuraId: "766bb0788f3a4ee29d9504e4ae4ce4b3",
    rpc: {
        56: "https://rpc.ankr.com/bsc"
    },
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: [
            "trust",
        ]
    },
    chainId: 56,
    pollingInterval: 15000
});

export const walletConnectProvider = new WalletConnectProvider({
    supportedChainIds: [ 1, 56 ],
    infuraId: "766bb0788f3a4ee29d9504e4ae4ce4b3",
    rpc: {
        56: "https://rpc.ankr.com/bsc"
    },
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: [
            "trust",
        ]
    },
    chainId: 56,
    pollingInterval: 15000
});

(async () => {
    await walletConnectProvider.enable();
})();