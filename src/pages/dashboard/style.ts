import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { Container } from "styles"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Dashboard = styled.div`

`


export const Header = styled.div`

    height:90px;
    display:flex;
    align-items:center;

    & ${Container} {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

export const Logo = styled(Link)`
    & img{
        width:125px;
    }
`

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    

`

export const NavItema = styled.a`
    color: ${color.darkerGray};
    padding:8px 16px;
    font-weight:500;
    text-decoration:none;

    &:hover {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        display:none;
    }
`

export const NavItemCwallet = styled.div`
    position:relative;
`

export const WalletConnect = styled.div`
    & button{
        cursor:pointer;
        color: ${color.white};
        font-size:16px;
        background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
        & svg {
            width:24px;
            height:24px;
            color: ${color.white};
            margin-left:8px;
        }
        height:42px;
        padding:0 16px;
        font-weight:400;
        border-radius:48px;
        display:flex;
        align-items:center;
        justify-content:center;
        width:fit-content;
        transition: all 0.1s ease-in-out;
        &:hover {
            background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
            box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        }
    }

    margin-right:16px;
`

export const CwalletVisible = styled.div`
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    color: ${color.white};
    height:42px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0 12px;
    border-radius: 8px;
    cursor:pointer;

    & svg {
        width:20px;
        height:20px;
    }

    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
`

export const CwalletDropdown = styled.div`
    position:absolute;
    top:100%;
    right:0;
    background: ${color.white};
    border-radius: 8px;
    box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    padding:16px;
    z-index:999;

`

export const CwalletBalance = styled.div`
    color: ${color.primary};
    font-size:16px;
    font-weight:500;
    margin-bottom:4px;
    white-space: nowrap;
    & span {
        color: ${color.darkerGray};
        font-size:14px;
        font-weight:400;
    }
`

export const CwalletAction = styled.div`
    white-space: nowrap;
    cursor:pointer;
    color: ${color.darkerGray};
    font-size:16px;
    font-weight:500;
    &:hover {
        color: ${color.primary};
    }
`

export const MyAccounts = styled.div`
    padding:32px;
    background-color: #D8E1F3;
    background: url('/bg.png');
    background-size: cover;
    background-repeat: repeat;
    border-radius: 16px;

    @media ${deviceMax.md} {
        padding:16px;
    }
`

export const MyAccountsHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding-bottom:24px;
    border-bottom: 1px solid ${color.primary};

    @media ${deviceMax.md} {
        padding-bottom:16px;
    }
`

export const MyAccountsHeaderTitle = styled.div`
    font-size:24px;
    font-weight:500;

    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size:16px;
    }
`

export const MyAccountsHeaderRight = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;

    & > *:not(:last-child) {
        margin-right:16px;
    }
`

export const MyAccountsHeaderNotification = styled.div`
    position:relative;

    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    color: ${color.white};
    height:42px;
    padding:8px 12px;
    display:flex;
    align-items:center;
    border-radius: 8px;
    cursor:pointer;

    & svg {
        width:20px;
        height:20px;
    }

    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

`

export const MyAccountsHeaderNotificationCount = styled.div`
    position:absolute;
    top:-5px;
    right:-5px;
    background: ${color.white};
    color: ${color.primary};
    height:20px;
    width:20px;
    display:flex;
    align-items:center;
    border-radius: 50%;
    justify-content:center;
    font-weight:bold;
`

export const MyAccountsHeaderAction = styled.div`
    padding:8px 32px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    border: 1px solid ${color.darkerGray};
    background: transparent;
    color: ${color.darkerGray};
    cursor:pointer;
    font-size:14px;

    &:hover {
        background: ${color.darkerGray};
        color: ${color.white};
    }

    @media ${deviceMax.md} {
        padding:8px 12px;
    }
`

export const MyAccountsNone = styled.div`
    margin-top:24px;
    display:flex;
    align-items:center;
    padding:24px;
    background-color:${color.white};
    border-radius:16px;

    @media ${deviceMax.md} {
        flex-direction:column;
    }
`

export const MyAccountsNoneIcon = styled.div`
    & img{
        height:120px;
    }
`

export const MyAccountsNoneText = styled.div`
    flex:1;
    font-size:20px;
    font-weight:500;
    color: ${color.darkerGray};

    & span {
        color: ${color.primary};
    }
`

export const MyAccountsNoneAction = styled.div`
    text-decoration:none;
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
`

export const MyAccountsLoading = styled.div`
    padding:24px;
    font-size:20px;
    font-weight:500;
    color: ${color.primary};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:24px;
`

export const MyAccountsList = styled.div`

    margin-top:24px;

    @media ${deviceMax.md} {
        margin-top:16px;
    }
    
    
`

export const MyAccountsListItem = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    &:not(:last-child) {
        margin-bottom:16px;
    }
    background-color:${color.white};
    padding:8px 16px;
    border-radius:16px;
`

export const MyAccountsListItemAddress = styled.div`
    color: ${color.darkerGray};
    font-size:18px;
    font-weight:500;

    @media ${deviceMax.md} {
        font-size:14px;
    }
`

export const MyAccountsListItemAction = styled.div`
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    @media ${deviceMax.md} {
        padding:8px 12px;
        font-size:14px;
    }
`

export const CreateAccount = styled.div`
    padding:32px;
    background-color: #D8E1F3;
    background: url('/bg.png');
    background-size: cover;
    background-repeat: repeat;
    border-radius: 16px;

    @media ${deviceMax.md} {
        padding:16px;
    }
`

export const CreateAccountHeader = styled.div`
    display:flex;
    align-items:center;
    position:relative;
    justify-content:center;
    padding-bottom:24px;
    border-bottom: 1px solid ${color.primary};

    @media ${deviceMax.md} {
        padding-bottom:16px;
    }
`

export const CreateAccountHeaderTitle = styled.div`
    font-size:24px;
    font-weight:500;

    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size:16px;
    }
`

export const CreateAccountHeaderAction = styled.div`
    position:absolute;
    left:0;
    font-size:24px;
    cursor:pointer;
    color: ${color.darkerGray};
    &:hover {
        color: ${color.primary};
    }
    padding-right:16px;
    padding-top:8px;
    padding-bottom:8px;
`

export const CreateAccountBody = styled.div`
    background: ${color.white};
    display:flex;
    justify-content:center;
    margin-top:24px;
    border-radius:16px;
`

export const CreateAccountBodyInner = styled.div`
    max-width:674px;
    width:100%;
    padding:48px 24px;

    @media ${deviceMax.md} {
        padding:8px;
    }
`

export const CreateAccountBodySwitch = styled.div`
    display:flex;
    align-items:center;
    border-radius:48px;
    overflow:hidden;
`

export const CreateAccountBodySwitchItem = styled.div<{active?:string}>`
    flex:1;
    background: #F3F4F6;
    height:35px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    color: ${color.gray};
    font-size:14px;

    &:hover {
        background: ${color.lighterMain};
    }

    ${props => props.active === 'true' && `
        background: ${color.lighterMain};
        color: ${color.primary};

    `}
`

export const CreateAccountBodyForm = styled.div`
        margin-top:32px;
`

export const CreateAccountBodyFormInputAddress = styled.div`
    position:relative;
    display:flex;
    align-items:center;
`

export const CreateAccountBodyFormInputPlaceholder = styled.div`
    position:absolute;
    right:16px;
    cursor:default;
    pointer-events:none;
    color: ${color.gray};
`

export const CreateAccountBodyFormInput = styled.input`

    width:100%;
    height:55px;
    border-radius:32px;
    background:#F3F4F6;
    border:2px solid ${color.lighterGray};
    padding:16px 24px;
    font-size:14px;
    color: ${color.darkerGray};
    margin-top:8px;
    margin-bottom:8px;
    outline:none;

    &::placeholder {
        color: ${color.gray};
    }

    &:focus {
        border:2px solid ${color.primary};
    }

`

export const CreateAccountBodyFormAction = styled.div`
    margin-top:16px;
    font-size:14px;
    color: ${color.primary};
    text-align:right;
    cursor:pointer;
    &:hover {
        text-decoration:underline;
    }
`

export const CreateAccountBodyFormActionCancel = styled.div`
    margin-top:16px;
    font-size:14px;
    color: ${color.danger};
    text-align:right;
    cursor:pointer;
    &:hover {
        text-decoration:underline;
    }
`

export const AirdropSol = styled.div`
    color: ${color.primary};
    font-size:14px;
    cursor:pointer;
    &:hover {
        text-decoration:underline;
    }
    text-align:center;
`

export const CreateAccountBodySubmit = styled.button`
    margin-top:16px;
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:12px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    border:0;
    outline:none;

    &:disabled {
        opacity:0.5;
        cursor:default;
    }
`

export const MyDomains = styled.div`
    background: ${color.lighterGray};
    margin-top:32px;
    border-radius:16px;
    padding:32px;

    @media ${deviceMax.md} {
        padding:16px;
    }
`

export const MyDomainsHeader = styled.div`
    display:flex;
    align-items:center;
`

export const MyDomainsHeaderTitle = styled.div`
    font-size:24px;
    font-weight:500;

    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size:16px;
    }
`

export const MyDomainsList = styled.div`
    border-top: 1px solid ${color.primary};
    padding-top:24px;
    margin-top:24px;

    @media ${deviceMax.md} {
        padding-top:16px;
        margin-top:16px;
    }
`

export const MyDomainsListItem = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    &:not(:last-child) {
        margin-bottom:16px;
    }
    background-color:${color.white};
    padding:8px 16px;
    border-radius:16px;
`

export const MyDomainsListItemAddress = styled.div`
    color: ${color.darkerGray};
    font-size:18px;
    font-weight:500;

    @media ${deviceMax.md} {
        font-size:14px;
    }
`

export const MyDomainsListItemAction = styled.div`
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    @media ${deviceMax.md} {
        padding:8px 12px;
        font-size:14px;
    }
`


export const Domain = styled.div`
    background: ${color.lighterGray};
    margin-top:32px;
    border-radius:16px;
    padding:32px;
    margin-bottom:40px;

    @media ${deviceMax.md} {
        padding:16px;
    }
`

export const DomainUpper = styled.div`
    display:flex;

    @media ${deviceMax.md} {
        flex-direction:column;
    }
`

export const DomainUpperLeft = styled.div`
    flex:1;
`

export const DomainTitle = styled.div`
    font-weight:500;
    font-size:24px;

    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size:16px;
    }
`

export const DomainDesc = styled.div`
    color: ${color.darkerGray};
`

export const DomainUpperRight = styled.div`
    flex:1;
    display:flex;
    position:relative;
    align-items:center;
`

export const DomainSearchInput = styled.input`

    width:100%;
    height:40px;
    border-radius:32px;
    background:${color.white};
    border:2px solid ${color.lighterGray};
    padding:16px 24px;
    font-size:14px;
    color: ${color.darkerGray};
    margin-top:8px;
    margin-bottom:8px;
    outline:none;

    &::placeholder {
        color: ${color.gray};
    }

    &:focus {
        border:2px solid ${color.primary};
        
    }

`

export const DomainSearchButton = styled.div`
    position:absolute;
    right:8px;
    padding:4px 16px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    text-decoration:none;
    cursor:pointer;
    transition: all 0.1s ease-in-out;
    font-size:14px;
    color: ${color.white};
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
        
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
    
`

export const DomainLoading = styled.div`
    padding:24px;
    font-size:20px;
    font-weight:500;
    color: ${color.primary};
    display:flex;
    align-items:center;
    justify-content:center;
`

export const DomainLower = styled.div`
    display:flex;
    align-items:center;
    background: ${color.white};
    border-radius:16px;
    padding:24px;
    margin-top:32px;

    @media ${deviceMax.md} {
        flex-direction:column;
        padding:16px;
    }
`

export const DomainLowerLeft = styled.div`
    flex:1;

`

export const DomainLowerLeftInfo = styled.div`
    display:flex;
    align-items:center;

    @media ${deviceMax.md} {
        justify-content:center;
    }
`

export const DomainLowerLeftTitle = styled.div`
    font-weight:500;
    font-size:24px;
    margin-right:16px;

    @media ${deviceMax.md} {
        margin-right:8px;
    }
`



export const DomainStatus = styled.div<{active?:string}>`

    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.active === 'true' ? "#2FB444": color.danger};
    margin-right:8px;

    @media ${deviceMax.md} {
        display:none;
    }

`

export const DomainStatusText = styled.div`
    font-size:14px;
    color: ${color.darkerGray};
    font-weight:500;

    @media ${deviceMax.md} {
        display:none;
    }
`

export const DomainStatusMobile = styled.div`
    display:none;
    @media ${deviceMax.md} {
        display:flex;
        align-items:center;
        ${DomainStatusText} {
            display:block;
        }

        ${DomainStatus} {
            display:block;
        }
    }

`

export const DomainLowerLeftPrice = styled.div`
    font-size:24px;
    font-weight:600;
    color: ${color.primary};
`

export const DomainLowerRight = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:flex-end;

    & a{
        font-size:12px;
        color: ${color.primary};
        text-decoration:none;

        &:hover {
            text-decoration:underline;
        }
        
    }

    @media ${deviceMax.md} {
        width:100%;
        
        & a{
            margin-top:8px;
            text-align:center;
            align-self:center;
            font-size:14px;
        }
    }
`

export const DomainBuyButton = styled.div`
    text-decoration:none;
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    @media ${deviceMax.md} {
        width:100%;
        margin-top:16px;
    }
`

