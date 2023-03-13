import { PublicKey, Connection, sendAndConfirmTransaction, ComputeBudgetProgram } from "@solana/web3.js"
import { IDL } from './mxns.types'
import { getHashedName, getNameAccountKey, NameRegistryState, Numberu32, Numberu64 } from "./snsutils";
import * as anchor from "@project-serum/anchor"
import { emptyAnchorWallet } from "utils/helpers";
import { SOLANA_CONNECTION, SOLANA_CONNECTION_FINALIZED, WaitForTransaction } from "./connection";
import toast from "react-hot-toast";
import { getATokenAccountsNeedCreate } from "./spltoken";
import * as spltoken from "@solana/spl-token";

export const SNS_PROGRAM_ID = new PublicKey("namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX")
export const MXNS_PROGRAM_ID = new PublicKey("H6V38WeDZ7ZMKeGUU3jCXe5ieTcdz4DrfuHFyE6TBm4Q")
export const TLD_ROOT = new PublicKey("CFDPzCJQZxQKYAcictmzwXGgEKV12GsVaajsABPGiJKZ")
export const USDC_PK = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

export const domainLookup = async (domain: string) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(PublicKey.default), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, MXNS_PROGRAM_ID, anchorConnection)

    const [nameClassPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('nameclass')],
        program.programId
    )

    const hashedName = await getHashedName(domain);
    const nameAccountKey = await getNameAccountKey(hashedName, nameClassPDA, TLD_ROOT);

    let account = await SOLANA_CONNECTION.getAccountInfo(nameAccountKey, 'processed')

    if (account === null) {
        return true
    } else {
        return false
    }

}

export const getMyDomains = async (authority: PublicKey) => {

    const [nameClassPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('nameclass')],
        MXNS_PROGRAM_ID
    )

    const accounts = await SOLANA_CONNECTION.getProgramAccounts(SNS_PROGRAM_ID, {
        filters: [
            {
                memcmp: {
                    offset: 0,
                    bytes: TLD_ROOT.toBase58()
                }
            },
            {
                memcmp: {
                    offset: 32,
                    bytes: authority.toBase58()
                }
            },
            {
                memcmp: {
                    offset: 64,
                    bytes: nameClassPDA.toBase58()
                }
            }
        ]
    })

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(PublicKey.default), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, MXNS_PROGRAM_ID, anchorConnection)

    /*let ownedDomainsParsed = NameRegistryState.deserializeAll(accounts)
    ownedDomainsParsed = NameRegistryState.scrapeDomainNames(ownedDomainsParsed)*/

    let filters = accounts.map((account) => {
        return {
            memcmp: {
                offset: 8,
                bytes: account.pubkey.toBase58()
            }
        }
    })

    let ownedDomainsMxns: any = []

    for (let filter of filters) {
        const ownedDomainsMxnsAccounts = await program.account.domainAccount.all(
            [filter]
        )
        ownedDomainsMxns = [...ownedDomainsMxns, ...ownedDomainsMxnsAccounts]
    }

    return ownedDomainsMxns

}

export const domainRegister = async (domain: string, authority: any) => new Promise(async (resolve, reject) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, authority, anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, MXNS_PROGRAM_ID, anchorConnection)

    const [nameClassPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('nameclass')],
        program.programId
    )

    const hashedName = await getHashedName(domain);
    const nameAccountKey = await getNameAccountKey(hashedName, nameClassPDA, TLD_ROOT);

    let account = await SOLANA_CONNECTION.getAccountInfo(nameAccountKey, 'processed')

    if (account !== null) {
        toast.error("Domain already registered")
        return reject(false)
    }

    const [vaultPDA, __] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('vault')],
        program.programId
    )

    const [rootOwnerPDA, ___] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('root')],
        program.programId
    )

    //token stuff
    //get token account
    const { atokenix, destatokenAccount } = await getATokenAccountsNeedCreate(SOLANA_CONNECTION, authority.publicKey, vaultPDA, USDC_PK)

    const preInstructions = [];

    if (atokenix) {
        preInstructions.push(atokenix);
    }

    const tokenAccount = await spltoken.getAssociatedTokenAddress(USDC_PK, authority.publicKey)

    console.log("tokenAccount", tokenAccount.toBase58())

    //create domain account
    const [domainAccountPDA, ____] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('mxdomain'), new TextEncoder().encode(domain), new TextEncoder().encode("")],
        program.programId
    )
    /*const domainAccount = anchor.web3.Keypair.generate();
    const domainAccountInst = await program.account.domainAccount.createInstruction(domainAccount, 8 + 32 + 32 + 32 + 96)
    preInstructions.push(domainAccountInst)*/

    //doomain stuff
    const space = 20
    const balance = await SOLANA_CONNECTION.getMinimumBalanceForRentExemption(space + 96)

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1000000
    });

    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1
    });

    const nametx = await program.methods.nameRegistryCreate(
        Buffer.from((new TextEncoder()).encode(domain)),
        Buffer.from((new TextEncoder()).encode("")),
        hashedName,
        new anchor.BN(balance),
        new anchor.BN(space),
    )
        .accounts({
            authority: authority.publicKey,
            vault: vaultPDA,
            root: TLD_ROOT,
            rootOwner: rootOwnerPDA,
            nameClass: nameClassPDA,
            nameAccountKey,
            tokenAccount,
            mintAccount: USDC_PK,
            vaultTokenAccount: destatokenAccount,
            domainAccount: domainAccountPDA,
            tokenProgram: spltoken.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spltoken.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            snsProgram: SNS_PROGRAM_ID.toBase58(),
        })
        .preInstructions(preInstructions)
        .transaction()

    const tx = new anchor.web3.Transaction().add(modifyComputeUnits).add(addPriorityFee).add(nametx);

    tx.recentBlockhash = (await SOLANA_CONNECTION.getLatestBlockhash("finalized")).blockhash;
    tx.feePayer = new PublicKey(authority.publicKey.toString());

    const signed = await authority.signTransaction(tx);

    const sig = await SOLANA_CONNECTION_FINALIZED.sendRawTransaction(signed.serialize(), { skipPreflight: true, preflightCommitment: "finalized" });
    console.log("Transaction sent", sig)
    let loading = toast.loading("Waiting for Domain Buy Confirmation")

    try {
        let confirm = await WaitForTransaction(sig)
        toast.dismiss(loading)
        toast.success("Domain Bought Successfully")
    } catch (e) {
        console.log(e)
        toast.dismiss(loading)
        toast.error("Domain Buy Failed")
    }

    return resolve(true)



})

export const getDomainAccount = async (domain: string) => {

    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(PublicKey.default), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, MXNS_PROGRAM_ID, anchorConnection)

    const [domainAccountPDA, _] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('mxdomain'), new TextEncoder().encode(domain), new TextEncoder().encode("")],
        program.programId
    )

    const domainAccount = await program.account.domainAccount.fetch(domainAccountPDA)

    return {
        account: domainAccount,
        publicKey: domainAccountPDA
    }

}

export const getNameClassPDA = async () => {
    const anchorConnection = new anchor.AnchorProvider(SOLANA_CONNECTION, emptyAnchorWallet(PublicKey.default), anchor.AnchorProvider.defaultOptions())
    const program = new anchor.Program(IDL as anchor.Idl, MXNS_PROGRAM_ID, anchorConnection)

    const [nameClassPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('nameclass')],
        program.programId
    )

    return nameClassPDA
}