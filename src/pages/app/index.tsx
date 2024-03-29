import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { balanceOf, generateCloudWalletKeypair } from "services/solana/cwallet";
import * as C from "./style"
import { useDispatch } from "react-redux";
import { setBalance, setCloudWallet } from "services/slices/data";
import Sidebar from "components/parts/sidebar";
import Mail from "components/parts/mail";
import EmptyMailContent from "components/parts/mailContent/empty";
import MessageMailContent from "components/parts/mailContent/message";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "hooks/useWindowDimensions";
import SidebarMobile from "components/mobile/sidebar";
import { showVwalletPopup } from "services/slices/popup";

const AppHome = () => {

    const { publicKey, signMessage, connected } = useWallet()
    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const currentMail = useSelector((state: any) => state.data.currentMail)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { windowHeight, windowWidth } = useWindowDimensions()

    useEffect(() => {
        if (!connected || !cloudWallet || !mailAccount){
            navigate("/login")
        }else{
            refreshBalance()
        }
    }, [connected, cloudWallet, mailAccount])

    useEffect(() => {
        dispatch(showVwalletPopup(false))
    }, [])


    const refreshBalance = async () => {
        let balance = await balanceOf(cloudWallet.publicKey)
        dispatch(setBalance(balance))
    }

    if (!connected || !cloudWallet || !mailAccount)
        return <></>

    return (
        <C.Home>
            {windowWidth > 768 ? <Sidebar/> : <SidebarMobile/>}
            <Mail/>
            {currentMail !== null ? <MessageMailContent/> : <EmptyMailContent/>}

        </C.Home>
    );


}

export default AppHome;