import { faSpinner, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as C from "./style";
import parseHtml from "html-react-parser";
import { setCurrentMail, setRefreshInbox, setRefreshSent } from "services/slices/data";
import axios from "axios";
import { toast } from "react-hot-toast";
import { decrypt } from "utils/encryption";
import { Keypair, PublicKey } from "@solana/web3.js";
import { bufferToText, deserializeUint8Array } from "utils/helpers";
import { deleteMail, pdasToEmailAddresses } from "services/solana/mail";

const MessageMailContent = () => {

    const cwallet = useSelector((state: any) => state.data.cloudWallet)
    const currentMail = useSelector((state: any) => state.data.currentMail)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const dispatch = useDispatch()
    const [to, setTo] = React.useState<any>("")

    const [body, setBody] = React.useState<any>(null);

    useEffect(() => {

        if (currentMail === null)
            return;

        setBody(null)
        setTo("")

        pdasToEmailAddresses(cwallet, [currentMail.to]).then((res: any) => {
            if (res)
                setTo(bufferToText(res[0].address) + "@" + bufferToText(res[0].domain))
        })

        //if currentMail.body starts with ar://, then it's an arweave link
        if (currentMail.body.startsWith("ar://")) {
            const arweaveLink = currentMail.body.replace("ar://", "https://arweave.net/")

            axios.get(arweaveLink).then((res) => {

                let data: Uint8Array;

                if (currentMail.from === mailAccount.address + "@" + mailAccount.domain) {
                    
                    data = decrypt(
                        new Uint8Array(cwallet.cryptoKeypair.secretKey),
                        new Uint8Array(cwallet.cryptoKeypair.publicKey),
                        deserializeUint8Array(res.data.body[1][0]),
                        deserializeUint8Array(res.data.body[1][1])
                    )!
                } else {
                    data = decrypt(
                        new Uint8Array(cwallet.cryptoKeypair.secretKey),
                        deserializeUint8Array(currentMail.fromCkey),
                        deserializeUint8Array(res.data.body[0][0]),
                        deserializeUint8Array(res.data.body[0][1])
                    )!
                }
                setBody(Buffer.from(data).toString())


            }).catch((err) => {
                console.log(err)
                toast.error("Error while fetching mail content")
                setBody(currentMail.body)
            })

        } else {
            setBody(currentMail.body)
        }


    }, [currentMail])

    const handleDelete = () => {
        deleteMail(cwallet, new PublicKey(currentMail.pk)).then(() => {
            dispatch(setCurrentMail(null))
            toast.success("Mail deleted")
            dispatch(setRefreshInbox(true))
            dispatch(setRefreshSent(true))
        }).catch((err) => { })
    }

    return (
        <C.MessageMailContent>



            <C.Upper>
                <C.Subject>
                    {currentMail.subject}
                </C.Subject>
                <C.UpperContent>
                    <C.UpperLeft>
                        <C.Sender>
                            <span>from:</span> {currentMail.from}
                        </C.Sender>
                        <C.Sender>
                            <span>to:</span> {to}
                        </C.Sender>
                        <C.Date>
                            {currentMail.timestamp}
                        </C.Date>
                    </C.UpperLeft>
                    <C.UpperRight>
                        <C.Delete onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </C.Delete>
                        <C.Close onClick={() => dispatch(setCurrentMail(null))}>
                            <FontAwesomeIcon icon={faTimes} />
                        </C.Close>
                    </C.UpperRight>
                </C.UpperContent>
            </C.Upper>

            {body === null && (
                <C.Loading>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </C.Loading>
            )}

            {body !== null && (

                <C.Message>
                    {parseHtml(body)}
                </C.Message>
            )}

        </C.MessageMailContent>
    )

}

export default MessageMailContent