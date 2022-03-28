import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { walletConnect } from '../components/Connections/WalletConnectConnector';


const WalletConnectContext = React.createContext(null);


export const WalletConnect = ({ children }) => {
    const web3 = useWeb3React();
    const Wactivate = web3.activate;
    const Waccount = web3.account;
    const Wactive = web3.active;
    const Wdeactivate = web3.deactivate;

    const [ WisActive, WsetIsActive ] = useState(false);
    const [ WshouldDisable, WsetShouldDisable ] = useState(false);
    const [ WisLoading, WsetIsLoading ] = useState(true);

    useEffect(() => {
        // connect().then(val => {
        //     setIsLoading(false)
        // })
    }, [])

    const WhandleIsActive = useCallback(() => {
        console.log('App is connected with WalletConnect', Wactive);
        WsetIsActive(Wactive);
    }, [ Wactive ])

    useEffect(() => {
        WhandleIsActive();
    }, [ WhandleIsActive ])

    const Wconnect = async () => {
        console.log('Connecting to WalletConnect...');
        WsetShouldDisable(true);
        try {
            await Wactivate(walletConnect).then(() => {
                WsetShouldDisable(false);
            })
        } catch (error) {
            console.log('Error on connecting: ', error);
        }
    }

    const Mdisconnect = async () => {
        console.log('Disconnecting wallet from App...');
        try {
            await Wdeactivate();
        } catch (error) {
            console.log('Error on disconnnect: ', error);
        }
    }

    const Wvalues = useMemo(
        () => ({
            WisActive,
            Waccount,
            WisLoading,
            Wconnect,
            Mdisconnect,
            WshouldDisable
        }),
        [ WisActive, WisLoading, WshouldDisable, Waccount ]
    )

    return <WalletConnectContext.Provider value={Wvalues}>{children}</WalletConnectContext.Provider>
}

export const useWalletConnect = () => {
    const context = React.useContext(WalletConnectContext);

    if (!context) {
        throw new Error('This hook must be used with WalletConnect provider.');
    }

    return context;
}