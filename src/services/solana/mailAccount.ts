import { PublicKey, LAMPORTS_PER_SOL, Connection, Transaction, ComputeBudgetProgram, Keypair, SystemProgram } from '@solana/web3.js'
import * as anchor from "@project-serum/anchor"
import { SOLANA_CONNECTION, SOLANA_CONNECTION_FINALIZED, WaitForTransaction } from './connection'
import { Wallet } from "@project-serum/anchor/dist/cjs/provider"
import { store } from 'services/store'
import { IDL } from './types'
import { deserializeUint8Array } from 'utils/helpers'
import { toast } from 'react-hot-toast'
import { getDomainAccount, getNameClassPDA, TLD_ROOT } from './mxns'
import { getHashedName, getNameAccountKey, HASH_PREFIX } from './snsutils'
import { balanceOf } from './cwallet'

const systemProgram = anchor.web3.SystemProgram

const viewWallet = {
    signTransaction: null,
    signAllTransactions: null,
    publicKey: null
} as unknown as Wallet

const programId = "CigDTeq8uMe4B7TrTVJpD1viFzkXgphw6Zx97gtMtBVM"
const MAIL_ACCOUNT_SIZE = 233;
const DEFAULT_DOMAIN = "mailx"

export const checkMailAccount = async (publicKey: string) => {
    //console.log("Checking Mail Account", publicKey)
    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, viewWallet, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    const mailAccount = await program.account.mailAccount.all([
        {
            memcmp: {
                offset: 8,
                bytes: publicKey
            }
        },
        {
            dataSize: MAIL_ACCOUNT_SIZE
        }
    ])

    let all = await program.account.mailAccount.all()

    return mailAccount
}

export const getMyMailAccounts = async (publicKey: string) => {
    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, viewWallet, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    const mailAccount = await program.account.mailAccount.all([
        {
            memcmp: {
                offset: 8 + 32,
                bytes: publicKey
            }
        },
    ])

    return mailAccount
}

export const createMailAccount = async (cwallet: any, address: string, domain: any, authority: any, to?: PublicKey | null) => {

    try {

        const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, authority, anchor.AnchorProvider.defaultOptions())
        const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

        let nameAccount;
        if (domain) {
            const hashedName = await getHashedName(domain.domain);
            nameAccount = await getNameAccountKey(hashedName, (await getNameClassPDA()), TLD_ROOT);
        } else {
            const hashedName = await getHashedName(DEFAULT_DOMAIN);
            nameAccount = await getNameAccountKey(hashedName, (await getNameClassPDA()), TLD_ROOT);
        }

        let utf8Encoder = new TextEncoder();
        let addressu8: any = utf8Encoder.encode(address)
        let domainu8: any = utf8Encoder.encode(domain ? domain.domain : DEFAULT_DOMAIN)
        let tldu8: any = utf8Encoder.encode(domain ? domain.tld : "")

        let addressbytes = []
        for (let i = 0; i < addressu8.length; i++) {
            addressbytes.push(addressu8[i])
        }

        const addressbuffer = Buffer.from(addressu8);

        let domainbytes = []
        for (let i = 0; i < domainu8.length; i++) {
            domainbytes.push(domainu8[i])
        }

        const domainbuffer = Buffer.from(domainu8);

        let tldbytes = []
        for (let i = 0; i < tldu8.length; i++) {
            tldbytes.push(tldu8[i])
        }

        const tldbuffer = Buffer.from(tldu8);

        const [mailAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode('mail'), addressbuffer, domainbuffer],
            program.programId
        )

        const cwalletSigner = anchor.web3.Keypair.fromSecretKey(new Uint8Array(cwallet.secretKey))

        let tx: Transaction;
        let mailAccountRequest: any;

        let cryptoPubkey = Buffer.from(cwallet.cryptoKeypair.publicKey)

        if (to === null) {

            tx = await program.methods.createMailAccount(
                addressbuffer,
                domainbuffer,
                cryptoPubkey
            )
                .accounts({
                    authority: authority.publicKey,
                    wallet: new PublicKey(cwallet.publicKey),
                    mailAccount: mailAccount,
                    nameAccount,
                    systemProgram: systemProgram.programId,
                })
                .signers([cwalletSigner])
                .transaction()
        } else {

            mailAccountRequest = anchor.web3.Keypair.generate()
            let mailAccountRequestInstruction = await program.account.mailAccountRequest.createInstruction(mailAccountRequest, 200)

            tx = await program.methods.createMailAccountForUser(
                addressbuffer,
                domainbuffer,
            ).
                accounts({
                    authority: authority.publicKey,
                    user: to,
                    mailAccountRequest: mailAccountRequest.publicKey,
                    nameAccount,
                    systemProgram: systemProgram.programId,
                })
                .preInstructions([mailAccountRequestInstruction])
                .signers([mailAccountRequest])
                .transaction()
        }

        tx.recentBlockhash = (await SOLANA_CONNECTION_FINALIZED.getLatestBlockhash("finalized")).blockhash;
        tx.feePayer = authority.publicKey;

        try{

            let balance = await balanceOf(cwallet.publicKey)
            if (balance === 0) {
                //add tx to send lamports 0.016
                let lamports =  16000000
                tx.add(
                    SystemProgram.transfer({
                        fromPubkey: authority.publicKey,
                        toPubkey: new PublicKey(cwallet.publicKey),
                        lamports,
                    })
                )
            }

        }catch(e:any){
        }

        if (to === null) {
            tx.partialSign(cwalletSigner);
        } else {
            tx.partialSign(mailAccountRequest);
        }
        let loading;
        let sig : any;
        try {

            const signed = await authority.signTransaction(tx);
            sig = await SOLANA_CONNECTION_FINALIZED.sendRawTransaction(signed.serialize(), { skipPreflight: false, preflightCommitment: "finalized" });
            console.log("Transaction sent", sig)
            
            if (to === null) {
                loading = toast.loading("Creating Mail Account")
            } else {
                loading = toast.loading("Sending Mail Account Request")
            }
        } catch (e:any) {
            if (e.message && e.message.indexOf("Attempt to debit an account but found no record of a prior credit.") !== -1)
                toast.error("Insufficient Funds to Create Mail Account")
            else
                toast.error("Mail Account Creation Failed")
            console.log(e)
            return false
        }

        try {
            let confirm = await WaitForTransaction(sig)
            toast.dismiss(loading)
            if (to === null) {
                toast.success("Mail Account Created")
            } else {
                toast.success("Mail Account Request Sent")
            }
        } catch (e) {
            console.log(e)
            toast.dismiss(loading)
            toast.error("Mail Account Creation Failed")
        }

        return true

    } catch (e) {
        toast.error("Mail Account Creation Failed")
        console.log(e)
        return false
    }
}

export const claimMailAccount = async (cwallet: any, request: any, authority: any) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, authority, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    let utf8Encoder = new TextEncoder();
    let addressu8: any = utf8Encoder.encode(request.address)
    let domainu8: any = utf8Encoder.encode(request.domain)

    let addressbytes = []
    for (let i = 0; i < addressu8.length; i++) {
        addressbytes.push(addressu8[i])
    }

    const addressbuffer = Buffer.from(addressu8);

    let domainbytes = []
    for (let i = 0; i < domainu8.length; i++) {
        domainbytes.push(domainu8[i])
    }

    const domainbuffer = Buffer.from(domainu8);

    const [mailAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('mail'), addressbuffer, domainbuffer],
        program.programId
    )

    const cwalletSigner = anchor.web3.Keypair.fromSecretKey(new Uint8Array(cwallet.secretKey))

    const tx = await program.methods.claimMailAccount()
        .accounts({
            authority: authority.publicKey,
            wallet: new PublicKey(cwallet.publicKey),
            mailAccount: mailAccount,
            mailAccountRequest: new PublicKey(request.publicKey),
            systemProgram: systemProgram.programId,
        })
        .signers([cwalletSigner])
        .transaction()

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = authority.publicKey;
    tx.partialSign(cwalletSigner);

    const signed = await authority.signTransaction(tx);
    const sig = await SOLANA_CONNECTION.sendRawTransaction(signed.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });
    console.log("Transaction sent", sig)
    let loading = toast.loading("Claiming Mail Account")
    try {
        let confirm = await WaitForTransaction(sig)
        toast.dismiss(loading)
        toast.success("Mail Account Claimed")
    } catch (e) {
        console.log(e)
        toast.dismiss(loading)
        toast.error("Mail Account Claim Failed")
    }

    return true
}

export const rejectMailAccountRequest = async (request: any, authority: any) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, authority, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    const tx = await program.methods.rejectMailAccount()
        .accounts({
            authority: authority.publicKey,
            mailAccountRequest: new PublicKey(request.publicKey),
            systemProgram: systemProgram.programId,
        })
        .transaction()

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = authority.publicKey;

    const signed = await authority.signTransaction(tx);
    const sig = await SOLANA_CONNECTION.sendRawTransaction(signed.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });
    console.log("Transaction sent", sig)
    let loading = toast.loading("Rejecting Mail Account Request")
    try {
        let confirm = await WaitForTransaction(sig)
        toast.dismiss(loading)
        toast.success("Mail Account Request Rejected")
    } catch (e) {
        console.log(e)
        toast.dismiss(loading)
        toast.error("Mail Account Request Reject Failed")
    }

    return true

}

export const getMailCreationRequests = async (publicKey: PublicKey) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, viewWallet, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    const mailAccountRequest = await program.account.mailAccountRequest.all([
        {
            memcmp: {
                offset: 8,
                bytes: publicKey.toBase58()
            }
        },
    ])

    return mailAccountRequest

}

export const deleteMailAccount = async (account: any, authority: any) => {

    let utf8Encoder = new TextEncoder();
    let addressu8: any = utf8Encoder.encode(account.address)
    let domainu8: any = utf8Encoder.encode(account.domain)

    let addressbytes = []
    for (let i = 0; i < addressu8.length; i++) {
        addressbytes.push(addressu8[i])
    }

    const addressbuffer = Buffer.from(addressu8);

    let domainbytes = []
    for (let i = 0; i < domainu8.length; i++) {
        domainbytes.push(domainu8[i])
    }

    const domainbuffer = Buffer.from(domainu8);

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, authority, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    const tx = await program.methods.deleteMailAccount(
        addressbuffer,
        domainbuffer,
    )
        .accounts({
            authority: authority.publicKey,
            mailAccount: new PublicKey(account.publicKey),
            systemProgram: systemProgram.programId,
        })
        .transaction()

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = authority.publicKey;

    const signed = await authority.signTransaction(tx);

    const sig = await SOLANA_CONNECTION.sendRawTransaction(signed.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });
    console.log("Transaction sent", sig)
    let loading = toast.loading("Deleting Mail Account")
    try {
        let confirm = await WaitForTransaction(sig)
        toast.dismiss(loading)
        toast.success("Mail Account Deleted")
    } catch (e) {
        console.log(e)
        toast.dismiss(loading)
        toast.error("Mail Account Delete Failed")
    }

    return true
}