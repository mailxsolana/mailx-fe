import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { SOLANA_CONNECTION, SOLANA_CONNECTION_BUNDLR } from '../services/solana/connection';

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const bufferToText = (item: any) => {
    const buffer = Buffer.from(item, 'utf8');
    const bytesu8 = new Uint8Array(buffer);
    const utf8Decoder = new TextDecoder();
    const hash = utf8Decoder.decode(bytesu8);
    return hash;
}

export const uint8ArrayToText = (item: any) => {
    const utf8Decoder = new TextDecoder();
    const hash = utf8Decoder.decode(item);
    return hash;
}

export const Hex2Rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const shortenPublicKey = (publicKey: string) => {
    return publicKey.slice(0, 4) + "..." + publicKey.slice(-4);
}

export const serializeUint8Array = (array: Uint8Array) => {
    return Buffer.from(array).toString('base64');
}

export const deserializeUint8Array = (base64: string) => {
    return Buffer.from(base64, 'base64');
}

export const emptyAnchorWallet = (wallet: any) => {
    return {
        signTransaction: () => {},
        signAllTransactions: () => {},
        publicKey: wallet
    } as any
}

export const cwalletProvider = (cwallet: Keypair) => {
    return {
        sendTransaction: async (tx:any,provider:any,config:any) => {


            tx.recentBlockhash = (await SOLANA_CONNECTION_BUNDLR.getLatestBlockhash("finalized")).blockhash;
            tx.feePayer = cwallet.publicKey;
            tx.sign(cwallet)

            //send transaction
            const sig = await SOLANA_CONNECTION_BUNDLR.sendRawTransaction(tx.serialize(), { skipPreflight: false, preflightCommitment: "confirmed" });
            return sig;
            

        },
        signMessage:(data:Uint8Array) => {


            const signature = nacl.sign.detached(data, cwallet.secretKey);
            return signature;

        },
        publicKey: new PublicKey(cwallet.publicKey)
    } as any
}

export const emailToPDA = async (email:string, programId: PublicKey) => {

    const address = email.split("@")[0]
    const domain = email.split("@")[1]

    let addressBytes = []
    for (let i = 0; i < address.length; i++) {
        addressBytes.push(address.charCodeAt(i))
    }

    let domainBytes = []
    for (let i = 0; i < domain.length; i++) {
        domainBytes.push(domain.charCodeAt(i))
    }

    const addressBuffer = Buffer.from(addressBytes);
    const domainBuffer = Buffer.from(domainBytes);

    const [mailAccount, _] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('mail'), addressBuffer, domainBuffer],
        programId
    )

    return mailAccount;

}

export const emailToBuffer = async (email:string, programId: PublicKey) => {

    const address = email.split("@")[0]
    const domain = email.split("@")[1]

    let addressBytes = []
    for (let i = 0; i < address.length; i++) {
        addressBytes.push(address.charCodeAt(i))
    }

    let domainBytes = []
    for (let i = 0; i < domain.length; i++) {
        domainBytes.push(domain.charCodeAt(i))
    }

    const addressBuffer = Buffer.from(addressBytes);
    const domainBuffer = Buffer.from(domainBytes);

    const [mailAccountPDA, _] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('mail'), addressBuffer, domainBuffer],
        programId
    )

    return {
        mailAccountPDA,
        addressBuffer,
        domainBuffer
    }

}

export const limitString = (string: string, limit: number) => {
    return string.length > limit ? string.substring(0, limit) + "..." : string;
}

export const removeHtmlTags = (string: string) => {
    return string.replace(/(<([^>]+)>)/gi, "").trim();
}