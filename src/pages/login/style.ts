import styled, { keyframes } from "styled-components"
import { color } from "styles/theme"

export const Login = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-height:100vh;
    padding-left:24px;
    padding-right:24px;
`

export const Logo = styled.div`
    position:absolute;
    top:100px;

    & img{
        width:160px;
    }
`
export const Super = styled.div`
    background:${color.lighterGray};
    padding:60px;
    border-radius:32px;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    max-width:1100px;
    position:relative;
    min-height:480px;
    justify-content:center;
`

export const Title = styled.div`
    & span{
        color:${color.primary};
    }
    font-size:60px;
    font-weight:600;
`

export const Description = styled.div`
    font-size:20px;
    color:${color.darkerGray};
    margin-top:16px;
    margin-bottom:24px;
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
        padding:16px 48px;
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

    display:flex;

`

export const SignButton = styled.div`
    margin-left:16px;
    padding:8px 48px;
    border-radius:48px;
        display:flex;
        align-items:center;
        justify-content:center;
        width:fit-content;
    border: 1px solid ${color.darkerGray};
    background: transparent;
    color: ${color.darkerGray};
    cursor:pointer;
        font-size:16px;

    &:hover {
        background: ${color.darkerGray};
        color: ${color.white};
    }
`

export const IconStar = styled.div`
    & svg{
        width:80px;
        height:80px;
    }
    color:${color.primary};
    bottom:-40px;
    left:-40px;
    position:absolute;
`
export const IconStar2 = styled.div`
    & svg{
        width:80px;
        height:80px;
    }
    color:${color.primary};
    top:-40px;
    right:-40px;
    position:absolute;
`

export const Register = styled.div`

    background:${color.lighterGray};
    padding:60px;
    border-radius:32px;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    max-width:950px;
    width:100%;
    position:relative;
    min-height:480px;
    justify-content:center;

`

export const RText = styled.div`
    font-size:30px;
    color:${color.gray};
    font-weight:500;
`

export const RTitle = styled.div`
    font-size:32px;
    font-weight:600;
`

export const MailInput = styled.div`
    max-width:600px;
    width:100%;
    position:relative;
    display:flex;
    align-items:center;
    margin-top:18px;
    margin-bottom:18px;
`

export const RInput = styled.input`
    width:100%;
    height:40px;
    border-radius:32px;
    background:${color.lighterGray};
    border:2px solid ${color.gray};
    padding:28px 24px;
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

export const RInputPlaceholder = styled.div`
    position:absolute;
    right:16px;
    color:${color.gray};
    font-weight:500;
    cursor:default;
    pointer-events:none;
`

export const CreateButton = styled.div`
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
    max-width:600px;
    width:100%;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
`

export const Loading = styled.div`
    font-size:28px;
`

