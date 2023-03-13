import { Connection, PublicKey } from "@solana/web3.js";
import * as spltoken from "@solana/spl-token";

export const getATokenAccountsNeedCreate = async (SOLANA_CONNECTION:Connection, wallet: PublicKey, owner: PublicKey, mint: PublicKey) => {

    let atokenix: any = null;
    let destatokenAccount: any = null;

    const destinationAccountPubkey = await getAssociatedTokenAccount(owner, mint)
    let response = await SOLANA_CONNECTION.getAccountInfo(destinationAccountPubkey)
    if (!response) {
        const createATAIx = spltoken.createAssociatedTokenAccountInstruction(
            wallet,
            destinationAccountPubkey,
            owner,
            mint
        )
        atokenix = createATAIx
    }
    destatokenAccount = destinationAccountPubkey

    return { atokenix, destatokenAccount };
}

export const getAssociatedTokenAccount = async (ownerPubkey: PublicKey, mintPk: PublicKey): Promise<PublicKey> => {
    let associatedTokenAccountPubkey = (await PublicKey.findProgramAddress(
        [
            ownerPubkey.toBuffer(),
            spltoken.TOKEN_PROGRAM_ID.toBuffer(),
            mintPk.toBuffer(), // mint address
        ],
        spltoken.ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];
    return associatedTokenAccountPubkey;
}