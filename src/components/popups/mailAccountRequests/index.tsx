import React, { useEffect, useState } from "react"
import * as P from "./style"
import BasePopup from "components/popups/base"
import { useDispatch, useSelector } from "react-redux"
import { showMailAccountRequestsPopup } from "services/slices/popup";
import { useWallet } from "@solana/wallet-adapter-react";
import { claimMailAccount, rejectMailAccountRequest } from "services/solana/mailAccount";
import { setMailAccountCreationRequests, setRefreshAccountsDashboard } from "services/slices/data";

const MailAccountRequests = () => {

    const show = useSelector((state: any) => state.popup.mailAccountRequestsPopup)
    const dispatch = useDispatch()
    const requests = useSelector((state: any) => state.data.mailAccountCreationRequests)

    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()
    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)

    const approve = (request: any) => {
        claimMailAccount(cloudWallet, request, { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions }).then(() => {
            dispatch(showMailAccountRequestsPopup(false))
            //remove request from list
            let newRequests = requests.filter((r: any) => r.fullAddress !== request.fullAddress)
            dispatch(setMailAccountCreationRequests(newRequests))
            dispatch(setRefreshAccountsDashboard(true))
        }).catch((e: any) => {
            console.log(e)
        })

    }

    const reject = (request: any) => {

        rejectMailAccountRequest(request, { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions }).then(() => {
            dispatch(showMailAccountRequestsPopup(false))
            //remove request from list
            let newRequests = requests.filter((r: any) => r.fullAddress !== request.fullAddress)
            dispatch(setMailAccountCreationRequests(newRequests))
            dispatch(setRefreshAccountsDashboard(true))
        }).catch((e: any) => {
            console.log(e)
        })

    }

    return (
        <P.Popup>
            <BasePopup show={show} hide={() => dispatch(showMailAccountRequestsPopup(false))}>
                <P.Title>Mail Account Creation Requests</P.Title>
                <P.Description>
                    These are the email addresses that have requested to be created for you.
                </P.Description>

                <P.MyDomainsList>
                    {requests.map((domain: any, i: number) => (
                        <P.MyDomainsListItem key={i}>
                            <P.MyDomainsListItemAddress>
                                {domain.fullAddress}
                            </P.MyDomainsListItemAddress>

                            <P.MyDomainsListItemActions>
                                <P.MyDomainsListItemAction onClick={() => approve(domain)}>
                                    Approve
                                </P.MyDomainsListItemAction>
                                <P.MyDomainsListItemActionReject onClick={() => reject(domain)}>
                                    Reject
                                </P.MyDomainsListItemActionReject>
                            </P.MyDomainsListItemActions>
                        </P.MyDomainsListItem>
                    ))}

                </P.MyDomainsList>

            </BasePopup>
        </P.Popup>
    );
};

export default MailAccountRequests;
