import { faCheck, faCheckCircle, faInfoCircle, faSpinner, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as C from "./style";
import parseHtml from "html-react-parser";
import { setCurrentMail, setMailDeletionRequests, setRefreshInbox, setRefreshSent } from "services/slices/data";
import axios from "axios";
import { toast } from "react-hot-toast";
import { decrypt } from "utils/encryption";
import { Keypair, PublicKey } from "@solana/web3.js";
import { bufferToText, deserializeUint8Array, emailToPDA } from "utils/helpers";
import { acceptMailDeleteRequest, createMailDeleteRequest, deleteMail, loadMailDeletionRequests, loadRequestedMailDeletions, pdasToEmailAddresses, rejectMailDeleteRequest } from "services/solana/mail";
import { useLightbox } from "hooks/lightbox"
import ConfirmationLb from "components/lightboxes/confirmation";
import { PROGRAM_ID } from "services/solana/connection";

const MessageMailContent = () => {

    const cwallet = useSelector((state: any) => state.data.cloudWallet)
    const currentMail = useSelector((state: any) => state.data.currentMail)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const mailDeletionRequests = useSelector((state: any) => state.data.mailDeletionRequests)
    const dispatch = useDispatch()
    const [to, setTo] = React.useState<any>("")

    const [body, setBody] = React.useState<any>(null);

    const { openLightbox, closeLightbox } = useLightbox()
    const [isMarkedToDelete, setIsMarkedToDelete] = React.useState<any>(false)
    const [deleteDetails, setDeleteDetails] = React.useState<any>(null)

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

        let findDelete = mailDeletionRequests.find((el: any) => el.mail === currentMail.pk)
        if (findDelete){
            setIsMarkedToDelete(true)
            setDeleteDetails(findDelete)
        }else{
            setIsMarkedToDelete(false)
            setDeleteDetails(null)
        }


    }, [currentMail])

    const handleDelete = () => {

        openLightbox(
            <ConfirmationLb
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                content="Are you sure you want to delete this mail?"
                onAccept={() => { proceedDelete(); closeLightbox() }}
                onReject={() => { closeLightbox() }}
            />
        )

    }

    const proceedDelete = async () => {

        if (currentMail.tpp === false) {
            deleteMail(cwallet, new PublicKey(currentMail.pk)).then(() => {
                dispatch(setCurrentMail(null))
                dispatch(setRefreshInbox(true))
                dispatch(setRefreshSent(true))
            }).catch((err) => { })
        } else {
            let requested = false
            if (currentMail.deleteRequest)
                requested = true

            if (!requested)
                if (mailDeletionRequests.find((el: any) => el.mail === currentMail.pk))
                    requested = true
            
            if (!requested){
                loadMailDeletionRequests(cwallet, `${mailAccount.address}@${mailAccount.domain}`).then((res: any) => {
                    let parsed = res.map((y: any) => {
                        return {
                            from: y.account.from.toString(),
                            mail: y.account.mail.toString(),
                        }
                    })
                    dispatch(setMailDeletionRequests(parsed))
                })

                if (mailDeletionRequests.find((el: any) => el.mail === currentMail.pk))
                    requested = true

                if (!requested) {
                    let myrequests = await loadRequestedMailDeletions(cwallet, `${mailAccount.address}@${mailAccount.domain}`)
                    if (myrequests.find((el: any) => el.account.mail.toBase58() === currentMail.pk))
                        return toast.error("You already requested to delete this mail")
                }
            }

            if (!requested)
                createMailDeleteRequest(cwallet, new PublicKey(currentMail.pk)).then(() => {
                    dispatch(setRefreshInbox(true))
                    dispatch(setRefreshSent(true))
                }).catch((err) => { })
            else{
                acceptDeleteRequest()
            }
        }
    }

    const acceptDeleteRequest = () => {
        acceptMailDeleteRequest(cwallet, new PublicKey(currentMail.pk)).then(() => {
            dispatch(setCurrentMail(null))
            dispatch(setRefreshInbox(true))
            dispatch(setRefreshSent(true))
        }).catch((err) => { })
    }

    const rejectDeleteRequest = () => {
        rejectMailDeleteRequest(cwallet, new PublicKey(currentMail.pk)).then(() => {
            dispatch(setCurrentMail(null))
            dispatch(setRefreshInbox(true))
            dispatch(setRefreshSent(true))
        }).catch((err) => { })
    }

    return (
        <C.MessageMailContent>

            {isMarkedToDelete && (
                <C.Notifications>
                    <C.TppNotification>
                        <C.TppNotificationLeft>
                            <C.TppNotificationIcon>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </C.TppNotificationIcon>
                            <C.TppNotificationContent>
                                <C.TppNotificationTitle>
                                    Mail Deletion Request
                                </C.TppNotificationTitle>
                                <C.TppNotificationText>
                                    {deleteDetails.from === currentMail.to ? to : currentMail.from} want's to delete this mail
                                </C.TppNotificationText>
                            </C.TppNotificationContent>
                        </C.TppNotificationLeft>
                        <C.TppNotificationRight>
                            <C.TppNotificationButton onClick={rejectDeleteRequest}>
                                Reject
                            </C.TppNotificationButton>
                            <C.TppNotificationButton btntype="accept" onClick={acceptDeleteRequest}>
                                Accept and Delete
                            </C.TppNotificationButton>
                        </C.TppNotificationRight>
                    </C.TppNotification>
                </C.Notifications>
            )}

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
                        {currentMail.tpp && (
                            <C.Tpp>
                                <FontAwesomeIcon icon={faCheckCircle} /> <span>2PP Mail</span>
                            </C.Tpp>
                        )}
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