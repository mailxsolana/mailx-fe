import { Link } from "react-router-dom"
import styled from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Sidebar = styled.div`
    width:264px;
    height:100%;
    display:flex;
    flex-direction:column;
    min-height:100vh;
    border-right:1px solid ${color.lighterGray};
`

export const Upper = styled.div`
    background-color: ${color.lighterGray};
    padding:16px;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const Logo = styled(Link)`
    & img {
        width:92px;
    }
`


export const Top = styled.div`
    display:flex;
    margin-top:32px;
    margin-bottom:48px;
    justify-content:space-between;
    width:100%;
`
export const Notifications = styled.div`
    background-color: ${color.primary};
    color: ${color.white};
    width:40px;
    height:27px;
    border-radius:35px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;

    &:hover {
        background-color: ${Hex2Rgba(color.primary, 0.8)};
    }
    position:relative;
`

export const NotificationCount = styled.div`
    position:absolute;
    top:-4px;
    right:-4px;
    background-color: ${color.white};
    color: ${color.primary};
    width:16px;
    height:16px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
`

export const WalletContainer = styled.div`
    position:relative;
    width:100%;
`

export const Wallet = styled.div<{expanded?:string}>`
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

export const Lower = styled.div`
    padding:16px;
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
        margin-left:8px;
    }
    padding:8px 16px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;

    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
`

export const Menu = styled.div`
    margin-top:24px;
`

export const MenuItem = styled.div<{active?:string}>`
    display:flex;
    align-items:center;
    padding:12px 16px;
    border-radius:16px;
    font-size:18px;
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

    margin-bottom:16px;

`

export const Header = styled.div`
    flex:1;
`

export const Footer = styled.div`
    padding:16px;
`

export const Logout = styled.div`
    background-color: ${color.lighterGray};
    color: ${color.gray};
    font-size:14px;
    align-items:center;
    justify-content:center;
    display:flex;
    padding:8px 16px;
    border-radius:16px;
    cursor:pointer;
    &:hover {
        background-color: ${color.lighterMain};
        color: ${color.primary};
    }

    & svg {
        width:24px;
        height:24px;
        margin-left:8px;
    }
`
