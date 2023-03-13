import { BN } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import assert from "assert";
import { createHash } from "crypto";
import { SNS_PROGRAM_ID } from "./connection";
import { deserializeUnchecked, Schema } from 'borsh';

export const HASH_PREFIX = 'SPL Name Service';


export async function getHashedName(name: string): Promise<Buffer> {
    const input = HASH_PREFIX + name;
    const buffer = createHash('sha256').update(input, 'utf8').digest();
    return buffer;
}

export async function getNameAccountKey(
    hashed_name: Buffer,
    nameClass?: PublicKey,
    nameParent?: PublicKey
): Promise<PublicKey> {
    const seeds = [hashed_name];
    if (nameClass) {
        seeds.push(nameClass.toBuffer());
    } else {
        seeds.push(Buffer.alloc(32));
    }
    if (nameParent) {
        seeds.push(nameParent.toBuffer());
    } else {
        seeds.push(Buffer.alloc(32));
    }
    const [nameAccountKey] = await PublicKey.findProgramAddress(
        seeds,
        SNS_PROGRAM_ID
    );
    return nameAccountKey;
}

export class Numberu32 extends BN {
    /**
     * Convert to Buffer representation
     */
    toBuffer(): Buffer {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 4) {
            return b;
        }
        assert(b.length < 4, 'Numberu32 too large');

        const zeroPad = Buffer.alloc(4);
        b.copy(zeroPad);
        return zeroPad;
    }

    /**
     * Construct a Numberu64 from Buffer representation
     */
    static fromBuffer(buffer: any): BN {
        assert(buffer.length === 4, `Invalid buffer length: ${buffer.length}`);
        return new BN(
            [...buffer]
                .reverse()
                .map((i) => `00${i.toString(16)}`.slice(-2))
                .join(''),
            16
        );
    }
}

export class Numberu64 extends BN {
    /**
     * Convert to Buffer representation
     */
    toBuffer(): Buffer {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        assert(b.length < 8, 'Numberu64 too large');

        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    }

    /**
     * Construct a Numberu64 from Buffer representation
     */
    static fromBuffer(buffer: any): BN {
        assert(buffer.length === 8, `Invalid buffer length: ${buffer.length}`);
        return new BN(
            [...buffer]
                .reverse()
                .map((i) => `00${i.toString(16)}`.slice(-2))
                .join(''),
            16
        );
    }
}

export class NameRegistryState {
    static HEADER_LEN = 96;
    parentName: PublicKey;
    owner: PublicKey;
    class: PublicKey;
    data: Buffer | undefined;

    static schema: Schema = new Map([
        [
            NameRegistryState,
            {
                kind: 'struct',
                fields: [
                    ['parentName', [32]],
                    ['owner', [32]],
                    ['class', [32]],
                ],
            },
        ],
    ]);
    constructor(obj: {
        parentName: Uint8Array;
        owner: Uint8Array;
        class: Uint8Array;
    }) {
        this.parentName = new PublicKey(obj.parentName);
        this.owner = new PublicKey(obj.owner);
        this.class = new PublicKey(obj.class);
    }

    public static async retrieve(
        connection: Connection,
        nameAccountKey: PublicKey
    ): Promise<NameRegistryState> {
        const nameAccount = await connection.getAccountInfo(
            nameAccountKey,
            'processed'
        );
        if (!nameAccount) {
            throw new Error('Invalid name account provided');
        }

        const res: NameRegistryState = deserializeUnchecked(
            this.schema,
            NameRegistryState,
            nameAccount.data
        );

        res.data = nameAccount.data?.slice(this.HEADER_LEN);

        return res;
    }

    public static deserializeAll(accounts: { pubkey: PublicKey; account: any }[]) {
        for (let i = 0; i < accounts.length; i++) {
            const data = accounts[i].account.data
            const res = deserializeUnchecked(
                this.schema,
                NameRegistryState,
                data
            );
            res.data = data.slice(this.HEADER_LEN);
            accounts[i].account = res;
        }

        return accounts;
    }

    public static scrapeDomainNames(accounts: { pubkey: PublicKey; account: any }[]) {

        for (let i = 0; i < accounts.length; i++) {
            if (!accounts[i].account.data)
                continue;

            const nameLength = new BN(accounts[i].account.data.slice(0, 4), "le").toNumber();
            accounts[i].account.domain = accounts[i].account.data.slice(4, 4 + nameLength).toString();
        }

        return accounts;
    }
}