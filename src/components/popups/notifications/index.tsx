import { useDispatch, useSelector } from "react-redux";
import { showNotificationsPopup } from "services/slices/popup";
import * as P from "./style"
import BasePopup from "components/popups/base"
import { useWallet } from "@solana/wallet-adapter-react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { loadMails, pdasToEmailAddresses } from "services/solana/mail";
import { toast } from "react-hot-toast";
import { bufferToText, serializeUint8Array } from "utils/helpers";
import { setCurrentMail } from "services/slices/data";
import moment from "moment";

export const Notifications = () => {

    const cwallet = useSelector((state: any) => state.data.cloudWallet)

    const show = useSelector((state: any) => state.popup.notificationsPopup)
    const mailDeletionRequests = useSelector((state: any) => state.data.mailDeletionRequests)
    const dispatch = useDispatch()

    const inboxMails = useSelector((state: any) => state.data.inboxMails)
    const sentMails = useSelector((state: any) => state.data.sentMails)

    const [notifications, setNotifications] = useState<any>([])

    useEffect(() => {

        if (mailDeletionRequests.length > 0 && show) {

            loadMails(cwallet, mailDeletionRequests).then((mails: any) => {

                let pdas = mailDeletionRequests.map((r: any) => r.from)

                pdasToEmailAddresses(cwallet, pdas).then((pdasParsed: any) => {
                    setNotifications(mails.map((r: any, i: number) => {
                        let mail : any;
                        let findInbox = inboxMails.find((m: any) => m.pk === mailDeletionRequests[i].mail)
                        let findSent = sentMails.find((m: any) => m.pk === mailDeletionRequests[i].mail)
                        if (findInbox){
                            mail = findInbox
                        }
                        else if (findSent){
                            mail = findSent
                        }
                        return {
                            title: "Mail Deletion Request",
                            description: `${bufferToText(pdasParsed[i].address)}@${bufferToText(pdasParsed[i].domain)} wants to delete "${bufferToText(r.subject)}" mail`,
                            mail
                        }
                    }))
                }).catch((err: any) => {
                    console.log(err)
                    toast.error("Error loading notifications")
                })
            }).catch((err: any) => {
                console.log(err)
                toast.error("Error loading notifications")
            })

        } else {
            setNotifications([])
        }

    }, [mailDeletionRequests, show])

    const viewMail = (mail: any) => {
        dispatch(setCurrentMail(mail))
        dispatch(showNotificationsPopup(false))
    }

    return (
        <P.Popup>
            <BasePopup title="Notifications" icon={<FontAwesomeIcon icon={faBell} />} show={show} hide={() => showNotificationsPopup(false)} >

                {notifications.map((r: any, i: number) => {
                    return (
                        <P.Notification key={i} onClick={() => viewMail(r.mail)}>
                            <P.NotificationLeft>
                                <P.NotificationTitle>
                                    {r.title}
                                </P.NotificationTitle>
                                <P.NotificationDescription>
                                    {r.description}
                                </P.NotificationDescription>
                            </P.NotificationLeft>
                            <P.NotificationDate>
                                {r.date}
                            </P.NotificationDate>
                        </P.Notification>
                    )
                })}

            </BasePopup>
        </P.Popup>
    )
}

export default Notifications;