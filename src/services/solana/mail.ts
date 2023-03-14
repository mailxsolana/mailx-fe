import { PublicKey, LAMPORTS_PER_SOL, Connection, Transaction, ComputeBudgetProgram, sendAndConfirmTransaction, Keypair } from '@solana/web3.js'
import * as anchor from "@project-serum/anchor"
import { estimateTransactionFeeForSize, SOLANA_CONNECTION, SOLANA_CONNECTION_FINALIZED, WaitForTransaction } from './connection'
import { Wallet } from "@project-serum/anchor/dist/cjs/provider"
import { store } from 'services/store'
import { IDL } from './types'
import { bufferToText, cwalletProvider, deserializeUint8Array, emailToBuffer, emailToPDA, emptyAnchorWallet, serializeUint8Array } from 'utils/helpers'
import { toast } from 'react-hot-toast'
import { WebBundlr } from "@bundlr-network/client";
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import { decrypt, encrypt, } from 'utils/encryption'
import { balanceOf } from './cwallet'

const systemProgram = anchor.web3.SystemProgram

const programId = "CigDTeq8uMe4B7TrTVJpD1viFzkXgphw6Zx97gtMtBVM"
const MAIL_SIZE = 1024

export const sendMail = async (cwallet: any, to: string, subject: string, body: string, authority: any) => {

    if (body.trim().length == 0) {
        toast.error("Message body cannot be empty")
        return Promise.reject(false)
    }

    if (subject.trim().length == 0) {
        toast.error("Message subject cannot be empty")
        return Promise.reject(false)
    }

    let loading = toast.loading("Loading...")

    try {

        const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(new PublicKey(cwallet.publicKey)), anchor.AnchorProvider.defaultOptions())
        const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

        let mailAccountPDA = await emailToPDA(to, program.programId)

        var toPDA: any;

        try{
            toPDA = await program.account.mailAccount.fetch(mailAccountPDA)
        }catch(e){
            toast.error("Recipient account not found")
            toast.dismiss(loading)
            return Promise.reject(false)
        }

        const cwalletSigner = anchor.web3.Keypair.fromSecretKey(new Uint8Array(cwallet.secretKey))

        //encryption
        const message = new TextEncoder().encode(body);

        const reciverEncryption = encrypt(new Uint8Array(cwallet.cryptoKeypair.secretKey), toPDA.ckey, message)
        const senderEncryption = encrypt(new Uint8Array(cwallet.cryptoKeypair.secretKey), new Uint8Array(cwallet.cryptoKeypair.publicKey), message)

        //upload to bundlr
        const content = JSON.stringify({
            version: "1.0",
            body: [
                [
                    serializeUint8Array(reciverEncryption.encryptedData),
                    serializeUint8Array(reciverEncryption.nonce),
                ],
                [
                    serializeUint8Array(senderEncryption.encryptedData),
                    serializeUint8Array(senderEncryption.nonce),
                ],
            ]
        })

        let sizeInBytes = new TextEncoder().encode(content).length;

        const wlf = bs58.encode(Buffer.from(cwalletSigner.secretKey))

        const bundlr = new WebBundlr("https://devnet.bundlr.network", "solana", cwalletProvider(cwalletSigner), {
            providerUrl: "https://api.devnet.solana.com",
        });


        let arweaveTransactionId = ""

        try {

            let price = await bundlr.getPrice(sizeInBytes);

            let totalFees = price.toNumber() * 1.1 + (await estimateTransactionFeeForSize(MAIL_SIZE))


            try {
                let balance = await balanceOf(cwallet.publicKey)
                if (balance * LAMPORTS_PER_SOL < totalFees) {
                    toast.error("Insufficient funds please deposit some SOL")
                    toast.dismiss(loading)
                    return Promise.reject("fund")
                }
            } catch (e) {
                toast.error("Insufficient funds please deposit some SOL")
                toast.dismiss(loading)
                return Promise.reject("fund")
            }


            let atomicBalance = await bundlr.getLoadedBalance();
            let convertedBalance = bundlr.utils.unitConverter(atomicBalance);
            /*console.log("Atomic balance: ", atomicBalance);
            console.log("Converted Balance: ", convertedBalance);
            console.log("price: ", price);*/

            await bundlr.fund(price, 1.1);
            const tags = [{ name: "Content-Type", value: "application/json" }];
            let tx = await bundlr.upload(content, {
                tags
            })
            arweaveTransactionId = tx.id
            console.log("Arweave Transaction ID: ", arweaveTransactionId)

        } catch (e) {
            console.log(e)
            toast.error("Error uploading to bundlr")
            toast.dismiss(loading)
            return Promise.reject(e)
        }

        // send mail
        let utf8Encoder = new TextEncoder();
        let subjectu8: any = utf8Encoder.encode(subject)

        let subjectbytes = []
        for (let i = 0; i < subjectu8.length; i++) {
            subjectbytes.push(subjectu8[i])
        }

        const subjectbuffer = Buffer.from(subjectu8);
        const bodybuffer = Buffer.from("ar://" + arweaveTransactionId);

        let { addressBuffer, domainBuffer } = await emailToBuffer(`${store.getState().data.mailAccount.address}@${store.getState().data.mailAccount.domain}`, program.programId)

        const mail = anchor.web3.Keypair.generate()

        let mailinst = await program.account.mail.createInstruction(mail, MAIL_SIZE)

        const tx = await program.methods.sendMail(
            addressBuffer,
            domainBuffer,
            mailAccountPDA,
            subjectbuffer,
            bodybuffer,
        ).accounts({
            mail: mail.publicKey,
            authority: new PublicKey(cwallet.publicKey),
            mailAccount: new PublicKey(store.getState().data.mailAccount.pk),
            systemProgram: systemProgram.programId,
        }).preInstructions([
            mailinst
        ])
            .transaction()

        tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
        tx.feePayer = new PublicKey(cwallet.publicKey)

        /*tx.sign(cwalletSigner, mail)
        const sig = await SOLANA_CONNECTION.sendRawTransaction(tx.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });*/

        try {

            await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [cwalletSigner, mail])
            toast.success("Mail sent!")
        } catch (e) {
            console.log(e)
            toast.error("Error sending mail")
            toast.dismiss(loading)
            return Promise.reject(e)
        }

        toast.dismiss(loading)
    } catch (e) {
        toast.dismiss(loading)
        console.log(e)
        toast.error("Error sending mail")
        return Promise.reject(e)
    }


    return true
}

export const getInbox = async (cwallet: any, email: string) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(new PublicKey(cwallet.publicKey)), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    let pda = await emailToPDA(email, program.programId)

    let all = await program.account.mail.all()


    let mails = await program.account.mail.all([
        {
            memcmp: {
                offset: 8 + 32,
                bytes: pda.toBase58()
            }
        },
        {
            dataSize: MAIL_SIZE
        }
    ])

    return mails

}

export const getSent = async (cwallet: any, email: string) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(new PublicKey(cwallet.publicKey)), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

    let pda = await emailToPDA(email, program.programId)

    let all = await program.account.mail.all()


    let mails = await program.account.mail.all([
        {
            memcmp: {
                offset: 8,
                bytes: pda.toBase58()
            }
        },
        {
            dataSize: MAIL_SIZE
        }
    ])

    return mails

}

export const pdasToEmailAddresses = async (cwallet: any, pdas: any) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(new PublicKey(cwallet.publicKey)), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)


    let addresses = await program.account.mailAccount.fetchMultiple(pdas)

    return addresses

}

export const deleteMail = async (cwallet: any, mail: any) => {
    let balance = await balanceOf(cwallet.publicKey)
    if (balance === 0) {
        toast.error("Insufficient funds please deposit some SOL")
        return Promise.reject("fund")
    }
    let loading = toast.loading("Deleting mail...")
    try {

        const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(new PublicKey(cwallet.publicKey)), anchor.AnchorProvider.defaultOptions())
        const program = new anchor.Program(IDL as anchor.Idl, programId, anchorConnection)

        const cwalletSigner = anchor.web3.Keypair.fromSecretKey(new Uint8Array(cwallet.secretKey))

        let { addressBuffer, domainBuffer } = await emailToBuffer(`${store.getState().data.mailAccount.address}@${store.getState().data.mailAccount.domain}`, program.programId)

        const tx = await program.methods.deleteMail(
            addressBuffer,
            domainBuffer,
        ).accounts({
            authority: new PublicKey(cwallet.publicKey),
            mail,
            mailAccount: new PublicKey(store.getState().data.mailAccount.pk),
        })
            .transaction()

        tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
        tx.feePayer = new PublicKey(cwallet.publicKey)

        try {

            await sendAndConfirmTransaction(SOLANA_CONNECTION_FINALIZED, tx, [cwalletSigner], { skipPreflight: false, preflightCommitment: "finalized" })
            toast.success("Mail deleted!")
            toast.dismiss(loading)
        } catch (e) {
            console.log(e)
            toast.error("Error deleting mail")
            toast.dismiss(loading)
            return Promise.reject(e)
        }

    } catch (e) {
        console.log(e)
        toast.error("Error deleting mail")
        toast.dismiss(loading)
        return Promise.reject(e)
    }

    return true
}