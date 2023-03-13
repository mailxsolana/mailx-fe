import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"
import { Dialog, DialogHeader } from "../base/style"

export const Popup = styled.div`
    & ${Dialog} {
        width: 550px;
    }
    text-align:center;
`

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
`

export const Input = styled.input`
width:100%;
    height:40px;
    border-radius:32px;
    background:${color.lighterGray};
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

    margin: 24px 0;
`

export const Action = styled.button`
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

    border: none;

    &:disabled {
        background: ${Hex2Rgba(color.primary, 0.5)};
        cursor: not-allowed;
    }
`