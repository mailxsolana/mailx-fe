import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"
import { Dialog, DialogHeader } from "../base/style"

export const Popup = styled.div`
    & ${Dialog} {
        width: 550px;
        padding:0px;
        margin-left:16px;
        margin-right:16px;
        border-radius:16px;
        border:1px solid ${color.primary};
    }
    text-align:center;

    & ${DialogHeader} {
        display:none;
    }
`



export const Wallet = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color: ${color.white};
    width:100%;
    border-radius:16px;
    padding:8px 16px;
    cursor:pointer;

    &:hover {
        background-color: ${Hex2Rgba(color.primary, 0.1)};
    }

        flex-direction:column;
        align-items:unset;
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        cursor:unset;
        &:hover {
            background-color: ${color.white};
        }
        width:100%;
        padding-bottom:16px;
    
`


export const WalletLeft = styled.div`

`

export const WalletTop = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    cursor:pointer;
`


export const CloudWallet = styled.div`
    margin-top:16px;
`

export const Balance = styled.div`
    background-color: ${color.primary};
    color: ${color.white};
    padding:8px 16px;
    border-radius:8px;
`

export const CloudWalletActions = styled.div`
    background-color: ${color.lighterGray};
    border-radius:8px;
    padding:8px;
    margin-top:16px;
`

export const CloudWalletAction = styled.div`
    background-color: ${color.white};
    border-radius:8px;
    padding:8px 16px;

    &:not(:last-child) {
        margin-bottom:8px;
    }
    color: ${color.darkerGray};

    cursor:pointer;
    &:hover {
        background-color: ${Hex2Rgba(color.primary, 0.1)};
    }
`


export const Address = styled.div`
    color: ${color.black};
    font-weight:600;
`

export const PubKey = styled.div`
    font-size:12px;
    color: ${color.gray};
`

export const WalletRight = styled.div`
    color: ${color.primary};
    font-size:18px;
`