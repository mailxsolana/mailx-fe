import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentMail, setRefreshInbox, setRefreshSent } from "services/slices/data"
import { getInbox, getSent, pdasToEmailAddresses } from "services/solana/mail"
import { bufferToText, limitString, removeHtmlTags, serializeUint8Array } from "utils/helpers"
import * as C from "./style"
import moment from "moment"

const Mail = () => {

    const [mails, setMails] = useState<any>([])

    const cwallet = useSelector((state: any) => state.data.cloudWallet)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const currentMail = useSelector((state: any) => state.data.currentMail)
    const shouldRefreshInbox = useSelector((state: any) => state.data.refreshInbox)
    const shouldRefreshSent = useSelector((state: any) => state.data.refreshSent)
    const dispatch = useDispatch()

    const mailPage = useSelector((state: any) => state.data.mailPage)

    const [refreshing, setRefreshing] = useState<any>(false)

    useEffect(() => {

        if (mailPage === "inbox"){
            setMails([])
            loadInbox()
        }
        else{
            setMails([])
            loadSent()
        }
    }, [mailPage])

    useEffect(() => {
        if (shouldRefreshInbox) {
            loadInbox()
            dispatch(setRefreshInbox(false))
        }
    }, [shouldRefreshInbox])

    useEffect(() => {
        if (shouldRefreshSent) {
            loadSent()
            dispatch(setRefreshSent(false))
        }
    }, [shouldRefreshSent])

    const loadInbox = async () => {
        if (mailPage !== "inbox")
            return;
        setRefreshing(true)
        getInbox(cwallet, `${mailAccount.address}@${mailAccount.domain}`).then((res: any) => {

            let parsed: any = []
            let pdas = res.map((r: any) => r.account.from)

            pdasToEmailAddresses(cwallet, pdas).then((pdasParsed: any) => {

                res.forEach((r: any, index: number) => {
                    parsed.push({
                        from: bufferToText(pdasParsed[index].address) + "@" + bufferToText(pdasParsed[index].domain),
                        fromCkey: serializeUint8Array(pdasParsed[index].ckey),
                        subject: bufferToText(r.account.subject),
                        body: bufferToText(r.account.body),
                        fromPk: pdasParsed[index].owner.toString(),
                        pk: r.publicKey.toString(),
                        timestamp: moment(r.account.timestamp.toNumber() * 1000).calendar(),
                        time:r.account.timestamp.toNumber() * 1000,
                        to: r.account.to.toString(),
                        //date: new Date(r.account.date)
                    })
                })

                //order by date
                parsed.sort((a: any, b: any) => {
                    return b.time - a.time
                })

                setMails(parsed)


            })

        }).catch((err: any) => {
            console.log(err)
            toast.error("Error while fetching inbox")
        }).finally(() => {
            setRefreshing(false)
        })
    }

    const loadSent = async () => {
        if (mailPage !== "sent")
            return;
        setRefreshing(true)
        getSent(cwallet, `${mailAccount.address}@${mailAccount.domain}`).then((res: any) => {

            let parsed: any = []
            let pdas = res.map((r: any) => r.account.from)

            pdasToEmailAddresses(cwallet, pdas).then((pdasParsed: any) => {

                res.forEach((r: any, index: number) => {
                    parsed.push({
                        from: bufferToText(pdasParsed[index].address) + "@" + bufferToText(pdasParsed[index].domain),
                        subject: bufferToText(r.account.subject),
                        body: bufferToText(r.account.body),
                        fromPk: pdasParsed[index].owner.toString(),
                        pk: r.publicKey.toString(),
                        timestamp: moment(r.account.timestamp.toNumber() * 1000).calendar(),
                        time:r.account.timestamp.toNumber() * 1000,
                        to: r.account.to.toString(),
                        //date: new Date(r.account.date)
                    })
                })

                //order by date
                parsed.sort((a: any, b: any) => {
                    return b.time - a.time
                })

                setMails(parsed)


            })

        }).catch((err: any) => {
            console.log(err)
            toast.error("Error while fetching sent emails")
        }).finally(() => {
            setRefreshing(false)
        })
    }

    const viewMail = (mail: any) => {
        dispatch(setCurrentMail(mail))
    }

    return (
        <C.Mail>
            <C.Upper>
                <C.UpperHead>
                    <C.Title>
                        Inbox
                    </C.Title>
                    <C.Refresh>
                        <FontAwesomeIcon icon={faSync} onClick={() => loadInbox()} spin={refreshing} />
                    </C.Refresh>
                </C.UpperHead>
                <C.Description>
                    {mails.length === 1 || mails.length === 0 ? mails.length +" mail" : mails.length + " mails"}
                </C.Description>
                <C.Search>
                    <input type="text" placeholder="Search" />
                </C.Search>
            </C.Upper>

            <C.MailList>
                {mails.map((m: any, index: number) => (
                    <C.MailItem key={index} onClick={() => viewMail(m)} active={(currentMail && currentMail.pk === m.pk) ? "true" : "false"} >
                        <C.MailItemUpper>
                            <C.Sender>
                                {m.from}
                            </C.Sender>
                            <C.Date>
                                {m.timestamp}
                            </C.Date>
                        </C.MailItemUpper>
                        <C.MailItemLower>
                            <C.Subject>
                                {limitString(m.subject, 100)}
                            </C.Subject>
                            {/*<C.Message>
                                {limitString(removeHtmlTags(m.body), 5)}
                </C.Message>*/}
                        </C.MailItemLower>
                    </C.MailItem>
                ))}
            </C.MailList>

        </C.Mail>
    )

}

export default Mail