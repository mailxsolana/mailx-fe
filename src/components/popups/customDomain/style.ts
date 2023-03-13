import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"
import { Dialog, DialogHeader } from "../base/style"

export const Popup = styled.div`
    & ${Dialog} {
        width: 700px;
    }

    ${DialogHeader} {
        display: none;
    }
`

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-top:16px;
`


export const MyDomainsList = styled.div`
    padding-top:24px;
    margin-top:24px;
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
`

export const Loading = styled.div`
    padding:24px;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    font-size:24px;
    color:${color.primary};
`