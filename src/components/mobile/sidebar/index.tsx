import { faBars, faCaretDown, faChevronDown, faChevronUp, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentMail, setMailPage } from "services/slices/data";
import { showDepositPopup, showSendPopup, showVwalletPopup, showWithdrawPopup } from "services/slices/popup";
import { shortenPublicKey } from "utils/helpers";
import { IconInbox, IconLogout, IconNewMail, IconSent } from "utils/icons";
import * as C from "./style";

const SidebarMobile = () => {

    const { publicKey } = useWallet()

    const dispatch = useDispatch()
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const balance = useSelector((state: any) => state.data.balance)
    const mailPage = useSelector((state: any) => state.data.mailPage)
    const navigate = useNavigate()
    const currentMail = useSelector((state: any) => state.data.currentMail)

    const newMail = () => {
        dispatch(showSendPopup(true))
    }

    return (
        <C.Sidebar>
            <C.Header>
                <C.Wallet onClick={() => dispatch(showVwalletPopup(true))}>
                    <C.WalletLeft>
                        <C.Address>
                            {mailAccount.address}@{mailAccount.domain}
                        </C.Address>
                        <C.PubKey>
                            {shortenPublicKey(publicKey?.toBase58() || "")}
                        </C.PubKey>
                    </C.WalletLeft>
                    <C.WalletRight>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </C.WalletRight>
                </C.Wallet>

                <C.HeaderRight>
                    <C.Action onClick={newMail}>
                        <IconNewMail />
                    </C.Action>

                    <C.Logout onClick={() => navigate("/dashboard")}>
                        <FontAwesomeIcon icon={faBars} />
                    </C.Logout>
                </C.HeaderRight>
            </C.Header>

            {currentMail === null && (
                <C.Menu>
                    <C.MenuItem onClick={() => { dispatch(setMailPage("inbox")); dispatch(setCurrentMail(null)) }} active={mailPage === "inbox" ? "true" : "false"}>
                        <IconInbox /> Inbox
                    </C.MenuItem>
                    <C.MenuItem onClick={() => { dispatch(setMailPage("sent")); dispatch(setCurrentMail(null)) }} active={mailPage === "sent" ? "true" : "false"}>
                        <IconSent /> Sent
                    </C.MenuItem>
                </C.Menu>
            )}

        </C.Sidebar>
    )

}

export default SidebarMobile