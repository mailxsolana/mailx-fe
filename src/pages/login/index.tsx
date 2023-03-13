import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCloudWallet, setMailAccount } from "services/slices/data";
import { generateCloudWalletKeypair } from "services/solana/cwallet";
import { checkMailAccount, createMailAccount } from "services/solana/mailAccount";
import { bufferToText } from "utils/helpers";
import { IconStar, IconWallet } from "utils/icons";
import * as C from "./style"

const Login = () => {

    const { publicKey, signMessage, connected, connect, signTransaction, signAllTransactions } = useWallet()
    const cloudWallet = useSelector((state: any) => state.data.cloudWallet)
    const mailAccount = useSelector((state: any) => state.data.mailAccount)
    const dispatch = useDispatch()

    const [currentState, setCurrentState] = React.useState<any>("login")
    const usernameRef = React.useRef<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        handleSign()
    }, [connected])

    const handleSign = async () => {
        if (connected && !cloudWallet) {

            let keypair = await generateCloudWalletKeypair(publicKey!, signMessage)

            dispatch(setCloudWallet(keypair))

            navigate("/dashboard")
        } else {
            dispatch(setCloudWallet(null))
            dispatch(setMailAccount(null))
        }
    }

    useEffect(() => {
        if (connected && cloudWallet) {
            setCurrentState("loading")
            checkAccount()
        }
    }, [cloudWallet])

    const checkAccount = async () => {

        //let mail : any= await checkMailAccount(cloudWallet.publicKey)

        /*if (mail.length > 0) {
            console.log(mail)
            let pk = mail[0].publicKey.toString()
            let address = bufferToText(mail[0].account.address)
            let domain = bufferToText(mail[0].account.domain)

            dispatch(setMailAccount({ pk, address, domain }))
            navigate("/dashboard")
        }else{
            navigate("/dashboard")
        }*/

        navigate("/dashboard")

    }

    const register = async () => {

        if (!usernameRef.current.value) {
            toast.error("Please enter a username")
            return
        }

        createMailAccount(cloudWallet, usernameRef.current.value, null, { publicKey, signTransaction, signAllTransactions }).then((res: any) => {
            checkAccount()
        }).catch((err: any) => {
            toast.error(err)
        })

    }

    return (
        <C.Login>

            <C.Logo>
                <img src="/logo.png" alt="logo" />
            </C.Logo>

            {currentState === "login" && (
                <C.Super>
                    <C.Title>
                        Fully <span>decentralized e-mail</span> service
                    </C.Title>
                    <C.Description>
                        Mailx is a fully decentralized e-mail service that allows you to send and receive <br />encrypted e-mails without any central authority.
                    </C.Description>
                    <C.WalletConnect >
                        <WalletMultiButton />

                        {connected && (
                            <C.SignButton onClick={handleSign}>
                                Click to sign in
                            </C.SignButton>
                        )}
                    </C.WalletConnect>


                    <C.IconStar>
                        <IconStar />
                    </C.IconStar>
                    <C.IconStar2>
                        <IconStar />
                    </C.IconStar2>
                </C.Super>
            )}

            {currentState === "loading" && (
                <C.Loading>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </C.Loading>
            )}

            {currentState === "register" && (
                <C.Register>
                    <C.RText>
                        👋 Welcome, it looks like you don't have a mailx account
                    </C.RText>
                    <C.RTitle>
                        Create new account
                    </C.RTitle>
                    <C.MailInput>
                        <C.RInput placeholder="username" type="text" ref={usernameRef} />
                        <C.RInputPlaceholder>@mailx</C.RInputPlaceholder>
                    </C.MailInput>

                    <C.CreateButton onClick={register}>
                        Create MailX Account <IconWallet />
                    </C.CreateButton>

                </C.Register>
            )}

        </C.Login>
    );


}

export default Login;