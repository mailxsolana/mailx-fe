import { PublicKey, LAMPORTS_PER_SOL, Connection, Transaction, ComputeBudgetProgram, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js'
import * as anchor from "@project-serum/anchor"
import { SOLANA_CONNECTION, WaitForTransaction } from './connection'
import crypto from 'crypto'
import { serializeUint8Array } from 'utils/helpers'
import toast from 'react-hot-toast'
import nacl from 'tweetnacl'

const DEFAULT_WALLET_SEED = "cwallet"

export const generateCloudWalletKeypair = async (publicKey: PublicKey, signMessage: any) => {
    const message = new TextEncoder().encode(DEFAULT_WALLET_SEED + publicKey.toBase58());

    const signed = await signMessage(message);
    //console.log("Signed Message", signed);

    // Generate a SHA-256 hash from the signed message
    const hash = crypto.createHash("sha256").update(signed).digest();

    // Extract the first 32 bytes of the hash
    const seed = hash.slice(0, 32);

    // Derive the keypair from the seed
    const keypair = anchor.web3.Keypair.fromSeed(seed);

    //console.log("Generated Cloud Wallet Keypair", keypair.publicKey.toBase58());
    //console.log("Generated Cloud Wallet Keypair", keypair.secretKey);

    let sk = []

    for (let i = 0; i < keypair.secretKey.length; i++) {
        sk.push(keypair.secretKey[i])
    }

    // Generate a Curve25519 public key from the secret key for use with NaCl
    // Derive a constant secret key from the seed using SHA-256
    const cryptoHash = crypto.createHash('sha256').update(seed).digest();
    const constantSecretKey = cryptoHash.slice(0, nacl.box.secretKeyLength);

    // Generate a NaCl box keypair from the Curve25519 public key and the constant secret key
    const naclBoxKeypair = nacl.box.keyPair.fromSecretKey(constantSecretKey);

    let naclSk = []
    for (let i = 0; i < naclBoxKeypair.secretKey.length; i++) {
        naclSk.push(naclBoxKeypair.secretKey[i])
    }
    let naclPk = []
    for (let i = 0; i < naclBoxKeypair.publicKey.length; i++) {
        naclPk.push(naclBoxKeypair.publicKey[i])
    }

    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: sk,
        cryptoKeypair: {
            publicKey: naclPk,
            secretKey: naclSk,
        },
    }
}

export const balanceOf = async (publicKey: string) => {
    const accountInfo = await SOLANA_CONNECTION.getAccountInfo(new PublicKey(publicKey));
    if (accountInfo === null) {
        return 0;
    }
    return accountInfo.lamports / LAMPORTS_PER_SOL;
}

export const depositTo = async (publicKey: string, amount: any, authority: any) => {

    //transfer to cloud wallet
    var tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: authority.publicKey,
            toPubkey: new PublicKey(publicKey),
            lamports: amount * LAMPORTS_PER_SOL
        })
    );

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = authority.publicKey;

    const signed = await authority.signTransaction(tx);
    const sig = await SOLANA_CONNECTION.sendRawTransaction(signed.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });
    let loading = toast.loading("Depositing...")

    try {
        let confirm = await WaitForTransaction(sig)
        toast.dismiss(loading)
        toast.success("Deposit Successful")
    } catch (e) {
        toast.dismiss(loading)
        toast.error("Deposit Failed")
        return Promise.reject(e)
    }

    return true
}

export const withdrawFrom = async (cwallet: any, amount: any, authority: any) => {

    var tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(cwallet.publicKey),
            toPubkey: authority.publicKey,
            lamports: amount * LAMPORTS_PER_SOL
        })
    );

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = new PublicKey(cwallet.publicKey)

    const cwalletSigner = anchor.web3.Keypair.fromSecretKey(new Uint8Array(cwallet.secretKey))

    let loading = toast.loading("Withdrawing...")

    try {

        await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [cwalletSigner])
        toast.success("Withdraw Successful")
    } catch (e) {
        console.log(e)
        toast.error("Withdraw Failed")
        return Promise.reject(e)
    }

    toast.dismiss(loading)

    return true
}