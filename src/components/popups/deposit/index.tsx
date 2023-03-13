import React, { useEffect, useState } from "react"
import * as P from "./style"

import { useDispatch, useSelector } from "react-redux"
import BasePopup from "components/popups/base"

import { showDepositPopup, showSendPopup } from "services/slices/popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faCoins, faLock } from "@fortawesome/free-solid-svg-icons"
import { setBalance } from "services/slices/data"
import { balanceOf, depositTo } from "services/solana/cwallet"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-hot-toast"


const DepositPopup = () => {

    const show = useSelector((state: any) => state.popup.depositPopup)
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

    const deposit = () => {
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

        depositTo(cloudWallet.publicKey, amount, { publicKey, signTransaction, signAllTransactions }).then(() => {
            refreshBalance()
            dispatch(showDepositPopup(false))
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <P.Popup>
            <BasePopup title="Deposit" show={show} hide={() => showDepositPopup(false)} icon={<FontAwesomeIcon icon={faCoins} />} >

                <P.Title>
                    Deposit SOL
                </P.Title>

                <P.Input type="text" placeholder="Sol Amount" ref={inputRef} />

                <P.Action onClick={deposit} disabled={loading}>
                    Deposit
                </P.Action>

            </BasePopup>
        </P.Popup>
    )
}

export default DepositPopup