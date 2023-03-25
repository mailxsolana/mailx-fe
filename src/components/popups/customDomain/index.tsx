import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCustomDomainPopup } from "services/slices/popup";
import * as P from "./style"
import BasePopup from "components/popups/base"
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { getMyDomains } from "services/solana/mxns";
import { uint8ArrayToText } from "utils/helpers";
import { setCreateForSomeone, setCustomDomain } from "services/slices/data";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const CustomDomain = () => {

    const { publicKey } = useWallet()

    const show = useSelector((state: any) => state.popup.customDomainPopup)
    const [myDomains, setMyDomains] = useState<any>([])
    const [myDomainsLoading, setMyDomainsLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        if (show)
            loadDomains()

        return () => {
            setMyDomains([])
        }

    }, [show])

    const loadDomains = async () => {

        setMyDomainsLoading(true)

        getMyDomains(publicKey!).then((res: any) => {

            res = res.map((domain: any) => {
                return {
                    domain: uint8ArrayToText(domain.account.domain) + uint8ArrayToText(domain.account.tld),
                    name: uint8ArrayToText(domain.account.name),
                    tld: uint8ArrayToText(domain.account.tld),
                    publicKey: domain.account.nameAccount.toString(),
                    domainAccount: domain.publicKey.toString()
                }
            })

            //order alphabetically
            res.sort((a: any, b: any) => {
                if (a.domain < b.domain) {
                    return -1;
                }
                if (a.domain > b.domain) {
                    return 1;
                }
                return 0;
            })

            setMyDomains(res)
            setMyDomainsLoading(false)

        }).catch((err: any) => {
            console.log(err)
            toast.error("Error loading domains")

        }).finally(() => {
            setMyDomainsLoading(false)
        })

    }

    const select = (domain: any) => {

        dispatch(setCustomDomain(domain))
        dispatch(setCreateForSomeone(false))
        dispatch(showCustomDomainPopup(false))

    }

    const hide = () => {
        dispatch(showCustomDomainPopup(false))
        dispatch(setCreateForSomeone(false))
    }

    return (
        <P.Popup>
            <BasePopup title="Domains" show={show} isredux={false} hide={hide} >

                <P.Title>
                    Use your own domain
                </P.Title>

                {myDomainsLoading && (
                    <P.Loading>
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </P.Loading>
                )}

                <P.MyDomainsList>
                    {myDomains.map((domain: any, i: number) => (
                        <P.MyDomainsListItem key={i}>
                            <P.MyDomainsListItemAddress>
                                {domain.domain}
                            </P.MyDomainsListItemAddress>
                            <P.MyDomainsListItemAction onClick={() => select(domain)}>
                                Select
                            </P.MyDomainsListItemAction>
                        </P.MyDomainsListItem>
                    ))}

                </P.MyDomainsList>


            </BasePopup>
        </P.Popup>
    )
}

export default CustomDomain;