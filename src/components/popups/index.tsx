import SendPopup from "./send";
import DepositPopup from "./deposit"
import WithdrawPopup from "./withdraw";
import CustomDomain from "./customDomain";
import MailAccountRequests from "./mailAccountRequests";
import VwalletPopup from "./vwallet";
import Notifications from "./notifications";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSelector } from "react-redux";

const Popups = () => {

    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()

    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)

    if (!connected || !cloudWallet) {
        return <></>
    }

    return (
        <>
            <VwalletPopup/>
            <SendPopup/>
            <DepositPopup/>
            <WithdrawPopup/>
            <CustomDomain/>
            <Notifications/>
            
            <MailAccountRequests/>
        </>
    );
};

export default Popups;