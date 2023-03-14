import { faBell, faChevronLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCloudWallet, setCreateForSomeone, setCurrentMail, setCurrentWallet, setCustomDomain, setMailAccount, setMailAccountCreationRequests, setMailPage } from "services/slices/data";
import { showCustomDomainPopup, showDepositPopup, showMailAccountRequestsPopup, showWithdrawPopup } from "services/slices/popup";
import { airdropSol } from "services/solana/connection";
import { generateCloudWalletKeypair } from "services/solana/cwallet";
import { createMailAccount, deleteMailAccount, getMailCreationRequests, getMyMailAccounts } from "services/solana/mailAccount";
import { domainLookup, domainRegister, getMyDomains } from "services/solana/mxns";
import { Container } from "styles";
import { bufferToText, uint8ArrayToText } from "utils/helpers";
import { IconWallet } from "utils/icons";
import * as C from "./style";
import { AirdropSol } from "./style";

let walletConnectTimeout: any = null;

const Dashboard = () => {

    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()
    const [mailSection, setMailSection] = useState<any>("default")
    const domainSearchInput = useRef<any>(null)

    const [domainSearching, setDomainSearching] = useState<any>(false)
    const [domainSearchLoading, setDomainSearchLoading] = useState<any>(false)
    const [domainAvailable, setDomainAvailable] = useState<any>(false)
    const [domainDetails, setDomainDetails] = useState<any>(null)

    const [myDomainsLoading, setMyDomainsLoading] = useState<any>(false)
    const [myDomains, setMyDomains] = useState<any>([])

    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)
    const balance = useSelector((state: any) => state.data.balance)
    const [cloudWalletDropdown, setCloudWalletDropdown] = useState<any>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [unlocked, setUnlocked] = useState<any>(false)

    const customDomain = useSelector((state: any) => state.data.customDomain)
    const createForSomeone = useSelector((state: any) => state.data.createForSomeone)
    const mailAccountCreationRequests = useSelector((state: any) => state.data.mailAccountCreationRequests)
    const refreshAccountsDashboard = useSelector((state: any) => state.data.refreshAccountsDashboard)
    const currentWallet = useSelector((state: any) => state.data.currentWallet)
    const mailAccountInput = useRef<any>(null)
    const mailAccountInputPublicKey = useRef<any>(null)
    const [mailAccountRegisterLoading, setMailAccountRegisterLoading] = useState<any>(false)
    const [myMailAccountsLoading, setMyMailAccountsLoading] = useState<any>(false)
    const [myMailAccounts, setMyMailAccounts] = useState<any>([])
    const [createAccountTab, setCreateAccountTab] = useState<any>("forme")

    useEffect(() => {
        dispatch(setCurrentMail(null))
        dispatch(setMailPage("inbox"))
    }, [])

    useEffect(() => {

        if (connected && publicKey && currentWallet && publicKey.toBase58() !== currentWallet)
        {
            navigate("/login")

        }

    }, [publicKey])

    useEffect(() => {

        setUnlocked(false)

        if (connected) {

            clearTimeout(walletConnectTimeout)

            if (!cloudWallet) {
                generateCloudWalletKeypair(publicKey!, signMessage).then((res: any) => {

                    dispatch(setCloudWallet(res))
                    loadDomains()
                    getOwnedMailAccounts()
                    mailAccountRequests()
                    setUnlocked(true)
                    dispatch(setCurrentWallet(publicKey!.toBase58()))

                }).catch((err: any) => {
                    navigate("/login")
                })
            } else {
                loadDomains()
                getOwnedMailAccounts()
                mailAccountRequests()
                setUnlocked(true)
                dispatch(setCurrentWallet(publicKey!.toBase58()))
            }

        } else {
            //timeout 1 second if still not connected redirect to login
            walletConnectTimeout = setTimeout(() => {
                navigate("/login")
            }, 1000)
        }

    }, [connected])

    useEffect(() => {
        if (refreshAccountsDashboard) {
            getOwnedMailAccounts()
        }
    }, [refreshAccountsDashboard])

    const loadDomains = async () => {

        setMyDomainsLoading(true)
        setMyDomains([])
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

    const toMailCreateAccount = () => {
       setMailSection("create")
    }

    const toMailDefault = () => {
        setMailSection("default")
    }

    const domainSearch = async () => {

        if (!domainSearchInput.current.value) return;

        let domain = domainSearchInput.current.value.trim().toLowerCase()

        //verify address does not contain punctuation
        if (domain.trim().match(/^[a-zA-Z0-9]+$/g) === null) {
            toast.error("Domain can only contain letters and numbers")
            return;
        }

        setDomainSearchLoading(true)
        setDomainSearching(false)
        let look = await domainLookup(domain)

        if (look) {
            let price = 1;

            if (domain.length === 1) {
                price = 10
            } else if (domain.length === 2) {
                price = 3
            } else if (domain.length === 3) {
                price = 2
            } else if (domain.length >= 4) {
                price = 1
            }

            setDomainAvailable(true)
            setDomainDetails({
                domain, price
            })
        } else {
            setDomainAvailable(false)
            setDomainDetails({
                domain, price: 0
            })
        }

        setDomainSearching(true)
        setDomainSearchLoading(false)
    }

    const domainBuy = () => {
        domainRegister(domainDetails.domain, { publicKey, signTransaction, signAllTransactions }).then((res: any) => {
            //refresh domain list
            loadDomains()
            setDomainAvailable(false)
            setDomainDetails(null)
            setDomainSearching(false)
            setDomainSearchLoading(false)
            domainSearchInput.current.value = ""
        }).catch((err: any) => {

            console.log(err)

        })
    }

    const registerMailAccount = () => {

        if (mailAccountRegisterLoading) return;

        if (mailAccountInput.current.value.trim() === "") {
            toast.error("Please enter a valid username")
            return;
        }

        //verify address does not contain punctuation
        if (mailAccountInput.current.value.trim().match(/^[a-zA-Z0-9]+$/g) === null) {
            toast.error("Username can only contain letters and numbers")
            return;
        }

        //verify address is lowercase
        if (mailAccountInput.current.value.trim() !== mailAccountInput.current.value.trim().toLowerCase()) {
            toast.error("Username must be lowercase")
            return;
        }

        if (createAccountTab === "forother" && mailAccountInputPublicKey.current.value.trim() === "") {
            toast.error("Please enter a valid public key")
            return;
        }

        //parse public key
        if (createAccountTab === "forother") {
            if (!PublicKey.isOnCurve(mailAccountInputPublicKey.current.value.trim()))
                return toast.error("Invalid public key")
        }

        createMailAccount(cloudWallet, mailAccountInput.current.value.trim(), customDomain, { publicKey, signTransaction, signAllTransactions }, createAccountTab === "forother" ? new PublicKey(mailAccountInputPublicKey.current.value.trim()) : null).then((res: any) => {
            setMailSection("default")
            getOwnedMailAccounts()
        }).catch((err: any) => {
            console.log(err)
        }).finally(() => {
            setMailAccountRegisterLoading(false)
        })
    }

    useEffect(() => {
        if (mailSection === "default") {
            dispatch(setCustomDomain(null))
            setCreateAccountTab("forme")
        }
        if (mailAccountInput && mailAccountInput.current)
            mailAccountInput.current.value = ""
        if (mailAccountInputPublicKey && mailAccountInputPublicKey.current)
            mailAccountInputPublicKey.current.value = ""
    }, [mailSection])

    const getOwnedMailAccounts = () => {
        setMyMailAccounts([])
        setMyMailAccountsLoading(true)
        getMyMailAccounts(publicKey!.toBase58()).then((res: any) => {

            res = res.map((account: any) => {
                return {
                    fullAddress: uint8ArrayToText(account.account.address) + "@" + uint8ArrayToText(account.account.domain),
                    address: uint8ArrayToText(account.account.address),
                    domain: uint8ArrayToText(account.account.domain),
                    publicKey: account.publicKey.toString()
                }
            })

            setMyMailAccounts(res)

        }).catch((err: any) => {
            console.log(err)
        }).finally(() => {
            setMyMailAccountsLoading(false)
        })
    }

    const switchCreateAccountTab = (tab: any) => {

        if (tab === "forother") {
            //check if user has any domains
            if (myDomains.length === 0) {
                toast.error("You need to own a domain to create an email address for someone else")
                return;
            }

            dispatch(setCreateForSomeone(true))
            dispatch(showCustomDomainPopup(true))
        }

        setCreateAccountTab(tab)
    }

    useEffect(() => {

        if (createForSomeone === false && !customDomain) {
            setCreateAccountTab("forme")
        }

    }, [createForSomeone])

    const mailAccountRequests = async () => {
        getMailCreationRequests(publicKey!).then((res: any) => {

            res = res.map((account: any) => {
                return {
                    fullAddress: uint8ArrayToText(account.account.address) + "@" + uint8ArrayToText(account.account.domain),
                    address: uint8ArrayToText(account.account.address),
                    domain: uint8ArrayToText(account.account.domain),
                    from: account.account.from.toString(),
                    publicKey: account.publicKey.toString()
                }
            })

            dispatch(setMailAccountCreationRequests(res))

        }).catch((err: any) => {
            console.log(err)
            dispatch(setMailAccountCreationRequests([]))
        })
    }

    const launch = async (account:any) => {

        let pk = account.publicKey
        let address = account.address
        let domain = account.domain

        dispatch(setMailAccount({ pk, address, domain }))
        navigate("/app")

    }

    const handleDeleteAccount = (account: any) => {

        deleteMailAccount(account, { publicKey, signTransaction, signAllTransactions }).then((res: any) => {
            getOwnedMailAccounts()
        }).catch((err: any) => {
            console.log(err)
        })

    }

    const requestAirdropSol = async () => {
        airdropSol(publicKey!, 1).then((res: any) => {

        }).catch((err: any) => {

        })
    }

    if (!unlocked) {
        return (
            <></>
        )
    }

    return (
        <C.Dashboard>
            <C.Header>
                <Container>
                    <C.Logo to="/">
                        <img src="/logo.png" alt="logo" />
                    </C.Logo> 

                    <C.Nav>
                        <C.NavItema href="">
                            Whitepaper
                        </C.NavItema>
                        <C.NavItema href="https://twitter.com/mailx_sol" target="_blank">
                            Twitter
                        </C.NavItema>
                        <C.NavItema href="https://discord.gg/cWPHPHujAM" target="_blank">
                            Discord
                        </C.NavItema>
                        <C.WalletConnect >
                            <WalletMultiButton />
                        </C.WalletConnect>
                        <C.NavItemCwallet>
                            <C.CwalletVisible onClick={() => setCloudWalletDropdown(!cloudWalletDropdown)}>
                                <IconWallet />
                            </C.CwalletVisible>
                            {cloudWalletDropdown && (
                                <C.CwalletDropdown>
                                    <C.CwalletBalance>
                                        <span>Balance:</span> {balance} SOL
                                    </C.CwalletBalance>
                                    <C.CwalletAction onClick={() => dispatch(showDepositPopup(true))}>
                                        Deposit SOL
                                    </C.CwalletAction>
                                    <C.CwalletAction onClick={() => dispatch(showWithdrawPopup(true))}>
                                        Withdraw SOL
                                    </C.CwalletAction>
                                </C.CwalletDropdown>
                            )}
                        </C.NavItemCwallet>
                    </C.Nav>
                </Container>
            </C.Header>

            <Container>

                {mailSection === "default" && (
                    <C.MyAccounts>
                        <C.MyAccountsHeader>
                            <C.MyAccountsHeaderTitle>
                                My Mail Accounts <span>•</span> {myMailAccountsLoading ? "..." : myMailAccounts.length}
                            </C.MyAccountsHeaderTitle>
                            <C.MyAccountsHeaderRight>
                                {mailAccountCreationRequests.length > 0 && (
                                    <C.MyAccountsHeaderNotification onClick={() => dispatch(showMailAccountRequestsPopup(true))}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <C.MyAccountsHeaderNotificationCount>
                                            1
                                        </C.MyAccountsHeaderNotificationCount>
                                    </C.MyAccountsHeaderNotification>
                                )}
                                <C.MyAccountsHeaderAction onClick={toMailCreateAccount}>
                                    Create Account
                                </C.MyAccountsHeaderAction>
                            </C.MyAccountsHeaderRight>
                        </C.MyAccountsHeader>

                        {!myMailAccountsLoading && myMailAccounts.length === 0 && (
                            <C.MyAccountsNone>
                                <C.MyAccountsNoneIcon>
                                    <img src="/account-new.png" alt="empty" />
                                </C.MyAccountsNoneIcon>
                                <C.MyAccountsNoneText>
                                    👋 Welcome, it looks like you don't have a mail<span>x</span> account
                                </C.MyAccountsNoneText>
                                <C.MyAccountsNoneAction onClick={toMailCreateAccount}>
                                    Create Account
                                </C.MyAccountsNoneAction>
                            </C.MyAccountsNone>
                        )}

                        {myMailAccountsLoading && (
                            <C.MyAccountsLoading>
                                <FontAwesomeIcon icon={faSpinner} spin />
                            </C.MyAccountsLoading>
                        )}

                        {!myMailAccountsLoading && myMailAccounts.length > 0 && (

                            <C.MyAccountsList>
                                {myMailAccounts.map((account: any, i: number) => (
                                    <C.MyAccountsListItem key={i}>
                                        <C.MyAccountsListItemAddress>
                                            {account.fullAddress}
                                        </C.MyAccountsListItemAddress>
                                        <C.MyAccountsListItemAction onClick={() => launch(account)}>
                                            Launch
                                        </C.MyAccountsListItemAction>
                                        {/*
                                        <C.MyAccountsListItemAction onClick={() => handleDeleteAccount(account)}>
                                            Delete
                                        </C.MyAccountsListItemAction>
                                        */}
                                    </C.MyAccountsListItem>
                                ))}
                            </C.MyAccountsList>
                        )}
                    </C.MyAccounts>
                )}

                {mailSection === "create" && (

                    <C.CreateAccount>
                        <C.CreateAccountHeader>
                            <C.CreateAccountHeaderTitle>
                                Create Account
                            </C.CreateAccountHeaderTitle>
                            <C.CreateAccountHeaderAction onClick={toMailDefault}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </C.CreateAccountHeaderAction>
                        </C.CreateAccountHeader>

                        <C.CreateAccountBody>
                            <C.CreateAccountBodyInner>

                                <C.CreateAccountBodySwitch>
                                    <C.CreateAccountBodySwitchItem onClick={() => switchCreateAccountTab("forme")} active={createAccountTab === "forme" ? "true" : "false"} >
                                        create for me
                                    </C.CreateAccountBodySwitchItem>
                                    <C.CreateAccountBodySwitchItem onClick={() => switchCreateAccountTab("forother")} active={createAccountTab === "forother" ? "true" : "false"} >
                                        create for someone else
                                    </C.CreateAccountBodySwitchItem>
                                </C.CreateAccountBodySwitch>

                                <C.CreateAccountBodyForm>
                                    <C.CreateAccountBodyFormInputAddress>
                                        <C.CreateAccountBodyFormInput type="text" placeholder="username" ref={mailAccountInput} />

                                        <C.CreateAccountBodyFormInputPlaceholder>
                                            @{customDomain ? customDomain.domain : "mailx"}
                                        </C.CreateAccountBodyFormInputPlaceholder>
                                    </C.CreateAccountBodyFormInputAddress>
                                    {createAccountTab === "forother" && (
                                        <C.CreateAccountBodyFormInput type="text" placeholder="target user publickey" ref={mailAccountInputPublicKey} />
                                    )}
                                    {!customDomain && myDomains.length > 0 && (
                                        <C.CreateAccountBodyFormAction onClick={() => dispatch(showCustomDomainPopup(true))}>
                                            Use custom domain
                                        </C.CreateAccountBodyFormAction>
                                    )}
                                    {customDomain && createAccountTab === "forme" && (
                                        <C.CreateAccountBodyFormActionCancel onClick={() => dispatch(setCustomDomain(null))}>
                                            Use mailx
                                        </C.CreateAccountBodyFormActionCancel>
                                    )}
                                    {customDomain && createAccountTab === "forother" && (
                                        <C.CreateAccountBodyFormAction onClick={() => dispatch(showCustomDomainPopup(true))}>
                                            Change domain
                                        </C.CreateAccountBodyFormAction>
                                    )}

                                </C.CreateAccountBodyForm>

                                <C.CreateAccountBodySubmit onClick={registerMailAccount} disabled={mailAccountRegisterLoading}>
                                    {createAccountTab === "forme" ? "Create Account" : "Create Account for someone else"}
                                </C.CreateAccountBodySubmit>
                                
                                <C.AirdropSol onClick={requestAirdropSol}>
                                    Airdrop devnet SOL
                                </C.AirdropSol>

                            </C.CreateAccountBodyInner>
                        </C.CreateAccountBody>

                    </C.CreateAccount>

                )}

                <C.MyDomains>
                    <C.MyDomainsHeader>
                        <C.MyDomainsHeaderTitle>
                            My Domains <span>•</span> {myDomainsLoading ? "..." : myDomains.length}
                        </C.MyDomainsHeaderTitle>
                    </C.MyDomainsHeader>

                    {myDomains.length > 0 && (
                        <C.MyDomainsList>
                            {myDomains.map((domain: any, i: number) => (
                                <C.MyDomainsListItem key={i}>
                                    <C.MyDomainsListItemAddress>
                                        {domain.domain}
                                    </C.MyDomainsListItemAddress>
                                    <C.MyDomainsListItemAction>
                                        Manage
                                    </C.MyDomainsListItemAction>
                                </C.MyDomainsListItem>
                            ))}

                        </C.MyDomainsList>
                    )}
                </C.MyDomains>

                <C.Domain>
                    <C.DomainUpper>
                        <C.DomainUpperLeft>
                            <C.DomainTitle>
                                Domain Search
                            </C.DomainTitle>
                        </C.DomainUpperLeft>
                        <C.DomainUpperRight>
                            <C.DomainSearchInput type="text" placeholder="Search for a domain" ref={domainSearchInput} />
                            <C.DomainSearchButton onClick={domainSearch}>
                                Search
                            </C.DomainSearchButton>
                        </C.DomainUpperRight>
                    </C.DomainUpper>

                    {domainSearchLoading && (
                        <C.DomainLoading>
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </C.DomainLoading>
                    )}

                    {domainSearching && (
                        <C.DomainLower>
                            <C.DomainLowerLeft>
                                <C.DomainLowerLeftInfo>
                                    <C.DomainLowerLeftTitle>
                                        {domainDetails.domain}
                                    </C.DomainLowerLeftTitle>
                                    <C.DomainStatus active={domainAvailable ? "true" : "false"}></C.DomainStatus>
                                    <C.DomainStatusText>
                                        {domainAvailable ? "Available" : "Not Available"}
                                    </C.DomainStatusText>
                                </C.DomainLowerLeftInfo>
                                {domainAvailable && (
                                    <C.DomainLowerLeftPrice>
                                        {domainDetails.price} USDC
                                    </C.DomainLowerLeftPrice>
                                )}
                            </C.DomainLowerLeft>
                            <C.DomainLowerRight>
                                {domainAvailable && (
                                    <>
                                    <C.DomainBuyButton onClick={domainBuy}>
                                        Buy Now
                                    </C.DomainBuyButton>
                                    <a href="https://usdcfaucet.com/" target="_blank" rel="noreferrer">
                                        Airdrop devnet USDC
                                    </a>
                                    </>
                                )}
                            </C.DomainLowerRight>
                        </C.DomainLower>
                    )}
                </C.Domain>

            </Container>
        </C.Dashboard>
    );
};

export default Dashboard;