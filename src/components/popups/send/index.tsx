import React from "react"
import * as P from "./style"

import { useDispatch, useSelector } from "react-redux"
import BasePopup from "components/popups/base"

import { showDepositPopup, showSendPopup } from "services/slices/popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faLock } from "@fortawesome/free-solid-svg-icons"
import { IconNewMail } from "utils/icons"
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { setBalance, setRefreshSent, setRefreshInbox } from "services/slices/data"
import { balanceOf } from "services/solana/cwallet"
import { toast } from "react-hot-toast"
import { sendMail } from "services/solana/mail"
import { useWallet } from "@solana/wallet-adapter-react"
//@ts-ignore


const SendPopup = () => {

    const show = useSelector((state: any) => state.popup.sendPopup)
    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()
    const [body, setBody] = React.useState("")
    const [subject, setSubject] = React.useState("")
    const [to, setTo] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const dispatch = useDispatch()

    const send = () => {

        if (loading)
            return;

        if (to == "" || subject == "" || body == "")
            return toast.error("Please fill all fields")

        setLoading(true)

        sendMail(cloudWallet, to, subject, body, { publicKey, signTransaction, signAllTransactions }).then(() => {
            dispatch(showSendPopup(false))
            refreshBalance()
            if (to == mailAccount.address + "@" + mailAccount.domain)
                dispatch(setRefreshInbox(true))
            dispatch(setRefreshSent(true))
        }).catch((e: any) => {
            console.log(e)
            if (e === "fund"){
                dispatch(showDepositPopup(true))
            }

        }).finally(() => {
                setLoading(false)
            })

    }

    const refreshBalance = async () => {
        let balance = await balanceOf(cloudWallet.publicKey)
        dispatch(setBalance(balance))
    }

    return (
        <P.Popup>
            <BasePopup title="New Mail" show={show} hide={() => showSendPopup(false)} icon={<IconNewMail />} >

                <P.Send>
                    <P.Input type="text" placeholder="To" onChange={(e) => setTo(e.target.value)} />
                    <P.Input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
                    <P.Text>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={(editor: any) => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                setBody(data)
                            }}
                            onBlur={(event: any, editor: any) => {
                            }}
                            onFocus={(event: any, editor: any) => {
                            }}
                        />
                    </P.Text>

                    <P.Footer>
                        <P.SendButton onClick={send}>
                            Send <IconNewMail />
                        </P.SendButton>
                    </P.Footer>
                </P.Send>

            </BasePopup>
        </P.Popup>
    )
}

export default SendPopup