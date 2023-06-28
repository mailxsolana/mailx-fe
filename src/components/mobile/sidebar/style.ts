import styled from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Sidebar = styled.div`
    padding-top:90px;
`

export const Header = styled.div`
    display:flex;
    background-color: ${color.lighterGray};
    align-items:center;
    padding:16px;
    justify-content:space-between;
    position:fixed;
    width:100%;
    top:0;
`

export const HeaderRight = styled.div`
    display:flex;
    align-items:center;
`

export const Logout = styled.div`
    font-size:20px;
    padding:8px 16px;
    cursor:pointer;
`


export const Wallet = styled.div<{expanded?:string}>`
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color: ${color.white};
    width:fit-content;
    max-width:70%;
    min-width:50%;
    border-radius:16px;
    padding:8px 16px;
    cursor:pointer;

    &:hover {
        background-color: ${Hex2Rgba(color.primary, 0.1)};
    }

    ${props => props.expanded && `
        flex-direction:column;
        align-items:unset;
        border:1px solid ${color.primary};
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        cursor:unset;
        &:hover {
            background-color: ${color.white};
        }
        position:absolute;
        width:100%;
        top:0;
        padding-bottom:16px;
    `}
`

export const WalletPlaceholder = styled.div`
    height: 58px;
    width: 100%;
`

export const WalletLeft = styled.div`

`


export const Address = styled.div`
    color: ${color.black};
    font-weight:600;
    font-size:15px;
    padding-right:8px;
`

export const PubKey = styled.div`
    font-size:12px;
    color: ${color.gray};
`

export const WalletRight = styled.div`
    color: ${color.primary};
    font-size:18px;
`


export const Action = styled.div`
    cursor:pointer;
    color: ${color.white};
    font-size:18px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
    }
    padding:12px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;

    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    &:not(:last-child) {
        margin-right:8px;
    }
    position:relative;
`

export const NotificationCount = styled.div`
    position:absolute;
    top:-4px;
    right:-4px;
    background-color: ${color.white};
    color: ${color.primary};
    width:20px;
    height:20px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
`
export const Menu = styled.div`
    margin-top:16px;
    display:flex;
    padding:0 16px;
`

export const MenuItem = styled.div<{active?:string}>`
    display:flex;
    align-items:center;
    padding:8px 12px;
    border-radius:16px;
    font-size:14px;
    flex:1;
    cursor:pointer;
    background-color: ${color.lighterGray};
    color: ${color.darkerGray};
    &:hover {
        background-color: ${color.lighterMain};
        color: ${color.primary};
    }
    font-weight:500;
    border-left: 4px solid transparent;
    ${({active}) => active === "true" && `
        color: ${color.primary};
        background-color: ${color.lighterMain};
        border-left: 4px solid ${color.primary};
    `}

    & svg {
        width:24px;
        height:24px;
        margin-right:8px;
    }

    &:not(:last-child) {
        margin-right:8px;
    }

`