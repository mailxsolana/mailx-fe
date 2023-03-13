import { Keypair, PublicKey } from "@solana/web3.js"
import nacl from 'tweetnacl'
export const encrypt = (sender: Uint8Array, receiver: Uint8Array, message: Uint8Array) => {

  // Generate a random nonce
  const nonce = nacl.randomBytes(nacl.box.nonceLength)

  const encryptedData = nacl.box(
    message,
    nonce,
    receiver,
    sender
  )

  // Return the encrypted data and nonce
  return {
    encryptedData,
    nonce
  }
}

export const decrypt = (receiver: Uint8Array, sender: Uint8Array, encryptedData: Uint8Array, nonce: Uint8Array) => {
  return nacl.box.open(encryptedData, nonce, sender, receiver);
}
