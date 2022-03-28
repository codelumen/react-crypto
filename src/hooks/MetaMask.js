import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injectedMetaMask } from '../components/Connections/MetaMaskConnector';


const MetaMaskContext = React.createContext(null);


export const MetaMask = ({ children }) => {
    const web3 = useWeb3React();
    const Mactivate = web3.activate;
    const Maccount = web3.account;
    const Mactive = web3.active;
    const Mdeactivate = web3.deactivate;

    const [ MisActive, MsetIsActive ] = useState(false);
    const [ MshouldDisable, MsetShouldDisable ] = useState(false);
    const [ MisLoading, MsetIsLoading ] = useState(true);

    useEffect(() => {
        // connect().then(val => {
        //     setIsLoading(false)
        // })
    }, [])

    const MhandleIsActive = useCallback(() => {
        console.log('App is connected with MetaMask ', Mactive);
        MsetIsActive(Mactive);
    }, [ Mactive ])

    useEffect(() => {
        MhandleIsActive();
    }, [ MhandleIsActive ])

    const Mconnect = async () => {
        console.log('Connecting to MetaMask...');
        MsetShouldDisable(true);
        try {
            await Mactivate(injectedMetaMask).then(() => {
                MsetShouldDisable(false);
            })
        } catch (error) {
            console.log('Error on connecting: ', error);
        }
    }

    const Mdisconnect = async () => {
        console.log('Disconnecting wallet from App...');
        try {
            await Mdeactivate();
        } catch (error) {
            console.log('Error on disconnnect: ', error);
        }
    }

    const Mvalues = useMemo(
        () => ({
            MisActive,
            Maccount,
            MisLoading,
            Mconnect,
            Mdisconnect,
            MshouldDisable
        }),
        [ MisActive, MisLoading, MshouldDisable, Maccount ]
    )

    return <MetaMaskContext.Provider value={Mvalues}>{children}</MetaMaskContext.Provider>
}

export const useMetaMask = () => {
    const context = React.useContext(MetaMaskContext);

    if (!context) {
        throw new Error('This hook must be used with MetaMask provider.');
    }

    return context;
}