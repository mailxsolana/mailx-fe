import { Connection, GetProgramAccountsFilter, PublicKey, Transaction } from "@solana/web3.js"
import toast from "react-hot-toast";
import { store } from "services/store";
import { sleep } from "utils/helpers";

const SESSION_HASH = 'MAILXx' + Math.ceil(Math.random() * 1e9)
export const SOLANA_CONNECTION = new Connection("https://rpc-devnet.helius.xyz/?api-key=21034647-170b-4a53-bbd5-b0ba3108938c", { commitment: 'confirmed', httpHeaders: { "x-session-hash": SESSION_HASH } });
export const SOLANA_CONNECTION_DEVNET = new Connection("https://api.devnet.solana.com", { commitment: 'confirmed', httpHeaders: { "x-session-hash": SESSION_HASH } });
export const SOLANA_CONNECTION_FINALIZED = new Connection("https://rpc-devnet.helius.xyz/?api-key=21034647-170b-4a53-bbd5-b0ba3108938c", { commitment: 'finalized', httpHeaders: { "x-session-hash": SESSION_HASH } });
export const SOLANA_CONNECTION_BUNDLR = new Connection("https://rpc-devnet.helius.xyz/?api-key=21034647-170b-4a53-bbd5-b0ba3108938c", { commitment: 'confirmed', httpHeaders: { "x-session-hash": SESSION_HASH } });
//export const SOLANA_CONNECTION_BUNDLR = new Connection("https://rpc.helius.xyz/?api-key=3929efa1-32e5-4164-ba40-f1d6c115f2c5", { commitment: 'confirmed', httpHeaders: { "x-session-hash": SESSION_HASH } });
export const SNS_PROGRAM_ID = new PublicKey('namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX');
export const PROGRAM_ID = new PublicKey('2WTXnFHx5ZujYaJpwbqnaaB2aqc1yn6m5rZqNdQUCu61');

export const WaitForTransaction = (signature: string) => new Promise(async (resolve, reject) => {
    let done = false
    //90 second timeout
    let timeout = 90 * 1000

    //if timeout is reached, reject
    setTimeout(() => {
        if (!done) {
            reject("timeout")
            done = true
        }
    }, timeout)

    while (!done) {
        try {
            const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash();
            let confirm = await SOLANA_CONNECTION.confirmTransaction({
                signature,
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight
            })

            if (confirm.value.err) {
                console.error(confirm.value)
                done = true
                reject(confirm.value.err);
            }

            done = true
        } catch (error) {
            console.log(error)
            await sleep(1000)
        }
    }

    resolve(true)
})


export const airdropSol = async (publicKey: PublicKey, amount: number) => {
    let loading = toast.loading("Airdropping...")
    try {
        await SOLANA_CONNECTION_DEVNET.requestAirdrop(publicKey, amount * 1000000000)
        toast.success("Airdrop Successful")
        toast.dismiss(loading)
    } catch (e) {
        toast.error("Airdrop Failed")
        toast.dismiss(loading)
        return Promise.reject(e)
    }
    return true
}

export const estimateTransactionFeeForSize = async (size: number): Promise<number> => {
    const minBalance = await SOLANA_CONNECTION.getMinimumBalanceForRentExemption(size);
    return minBalance * 1.25
};