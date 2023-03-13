import { faCaretDown, faChevronDown, faChevronUp, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentMail, setMailPage } from "services/slices/data";
import { showDepositPopup, showSendPopup, showWithdrawPopup } from "services/slices/popup";
import { shortenPublicKey } from "utils/helpers";
import { IconInbox, IconLogout, IconNewMail, IconSent } from "utils/icons";
import * as C from "./style";

const Sidebar = () => {

    const [walletExpanded, setWalletExpanded] = useState(false)
    const { publicKey } = useWallet()

    const dispatch = useDispatch()
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const balance = useSelector((state: any) => state.data.balance)
    const mailPage = useSelector((state: any) => state.data.mailPage)
    const navigate = useNavigate()

    const newMail = () => {
        dispatch(showSendPopup(true))
    }

    return (
        <C.Sidebar>
            <C.Header>
                <C.Upper>
                    <C.Logo>
                        <img src="/logo.png" alt="logo" />
                    </C.Logo>

                    <C.WalletContainer>
                        {!walletExpanded && (
                            <C.Wallet onClick={() => setWalletExpanded(!walletExpanded)}>
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
                        )}

                        {walletExpanded && (
                            <>
                                <C.WalletPlaceholder></C.WalletPlaceholder>

                                <C.Wallet expanded="true">
                                    <C.WalletTop onClick={() => setWalletExpanded(!walletExpanded)}>
                                        <C.WalletLeft>
                                            <C.Address>
                                                {mailAccount.address}@{mailAccount.domain}
                                            </C.Address>
                                            <C.PubKey>
                                                {shortenPublicKey(publicKey?.toBase58() || "")}
                                            </C.PubKey>
                                        </C.WalletLeft>
                                        <C.WalletRight>
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </C.WalletRight>
                                    </C.WalletTop>
                                    <C.CloudWallet>
                                        <C.Balance>
                                            {balance} SOL
                                        </C.Balance>
                                        <C.CloudWalletActions>
                                            <C.CloudWalletAction onClick={() => dispatch(showDepositPopup(true))}>
                                                Deposit SOL
                                            </C.CloudWalletAction>
                                            <C.CloudWalletAction onClick={() => dispatch(showWithdrawPopup(true))}>
                                                Withdraw SOL
                                            </C.CloudWalletAction>
                                        </C.CloudWalletActions>
                                    </C.CloudWallet>
                                </C.Wallet>
                            </>
                        )}
                    </C.WalletContainer>
                </C.Upper>
                <C.Lower>
                    <C.Action onClick={newMail}>
                        New Mail <IconNewMail />
                    </C.Action>
                    <C.Menu>
                        <C.MenuItem onClick={() => { dispatch(setMailPage("inbox")); dispatch(setCurrentMail(null)) }} active={mailPage === "inbox" ? "true" : "false"}>
                            <IconInbox /> Inbox
                        </C.MenuItem>
                        <C.MenuItem onClick={() => { dispatch(setMailPage("sent")); dispatch(setCurrentMail(null)) }} active={mailPage === "sent" ? "true" : "false"}>
                            <IconSent /> Sent
                        </C.MenuItem>
                    </C.Menu>

                </C.Lower>
            </C.Header>

            <C.Footer>
                <C.Logout onClick={() => navigate("/dashboard")}>
                    Switch Accounts  <FontAwesomeIcon icon={faUsers} />
                </C.Logout>
            </C.Footer>
        </C.Sidebar>
    )

}

export default Sidebar