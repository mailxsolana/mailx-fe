import React, { useEffect, useState } from "react"
import * as P from "./style"

import { useDispatch, useSelector } from "react-redux"
import BasePopup from "components/popups/base"

import { showDepositPopup, showSendPopup, showVwalletPopup, showWithdrawPopup } from "services/slices/popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faChevronUp, faCoins, faLock, faTimes } from "@fortawesome/free-solid-svg-icons"
import { IconNewMail } from "utils/icons"
import { shortenPublicKey } from "utils/helpers"
import { useWallet } from "@solana/wallet-adapter-react"


const VWalletPopup = () => {

    const show = useSelector((state: any) => state.popup.vwalletPopup)
    const { publicKey } = useWallet()
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const balance = useSelector((state: any) => state.data.balance)
    const dispatch = useDispatch()

    if (!publicKey || !mailAccount) //if wallet is not connected or mail account is not created,
        return <></>

    return (
        <P.Popup>
            <BasePopup title="Wallet" show={show} hide={() => showVwalletPopup(false)} icon={<FontAwesomeIcon icon={faCoins} />} >

                <P.Wallet >
                    <P.WalletTop>
                        <P.WalletLeft>
                            <P.Address>
                                {mailAccount.address}@{mailAccount.domain}
                            </P.Address>
                            <P.PubKey>
                                {shortenPublicKey(publicKey?.toBase58() || "")}
                            </P.PubKey>
                        </P.WalletLeft>
                        <P.WalletRight onClick={() => dispatch(showVwalletPopup(false))}>
                            <FontAwesomeIcon icon={faTimes} />
                        </P.WalletRight>
                    </P.WalletTop>
                    <P.CloudWallet>
                        <P.Balance>
                            {balance} SOL
                        </P.Balance>
                        <P.CloudWalletActions>
                            <P.CloudWalletAction onClick={() => dispatch(showDepositPopup(true))}>
                                Deposit SOL
                            </P.CloudWalletAction>
                            <P.CloudWalletAction onClick={() => dispatch(showWithdrawPopup(true))}>
                                Withdraw SOL
                            </P.CloudWalletAction>
                        </P.CloudWalletActions>
                    </P.CloudWallet>
                </P.Wallet>


            </BasePopup>
        </P.Popup>
    )
}

export default VWalletPopup