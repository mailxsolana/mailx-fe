import React, { useEffect, useState } from "react"
import * as P from "./style"

import { useDispatch, useSelector } from "react-redux"
import BasePopup from "components/popups/base"

import { showDepositPopup, showSendPopup, showWithdrawPopup } from "services/slices/popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faCoins, faLock } from "@fortawesome/free-solid-svg-icons"
import { IconNewMail } from "utils/icons"
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useWallet } from "@solana/wallet-adapter-react"
import toast from "react-hot-toast"
import { setBalance } from "services/slices/data"
import { balanceOf, depositTo, withdrawFrom } from "services/solana/cwallet"
import deposit from "../deposit"
//@ts-ignore


const WithdrawPopup = () => {

    const show = useSelector((state: any) => state.popup.withdrawPopup)
    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()

    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const refreshBalance = async () => {
        let balance = await balanceOf(cloudWallet.publicKey)
        dispatch(setBalance(balance))
    }

    useEffect(() => {
        refreshBalance()
    }, [show])

    const inputRef = React.useRef<any>(null)

    const withdraw = () => {

        if (loading)
            return;

        setLoading(true)

        let amount = inputRef.current.value

        if (amount == "")
            return

        //if amount is not a number
        if (isNaN(amount))
        {
            toast.error("Amount must be a number")
            return
        }

        amount = amount.trim()

        withdrawFrom(cloudWallet, amount, { publicKey, signTransaction, signAllTransactions }).then(() => {
            refreshBalance()
            dispatch(showWithdrawPopup(false))
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <P.Popup>
            <BasePopup title="Withdraw" show={show} hide={() => showWithdrawPopup(false)} icon={<FontAwesomeIcon icon={faCoins} />} >

            <P.Title>
                    Withdraw SOL
                </P.Title>

                <P.Input type="text" placeholder="Sol Amount" ref={inputRef} />

                <P.Action onClick={withdraw} disabled={loading}>
                    Withdraw
                </P.Action>

            </BasePopup>
        </P.Popup>
    )
}

export default WithdrawPopup