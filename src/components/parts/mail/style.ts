import styled from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Mail = styled.div<{viewingMail?:string}>`
    width:466px;
    height:100%;
    display:flex;
    flex-direction:column;
    min-height:100vh;
    border-right:1px solid ${color.lighterGray};

    @media ${deviceMax.md} {
        width:100%;

        ${props => props.viewingMail === "true" && `
            display:none;
        `}
    }
    
`	

export const Upper = styled.div`
    padding-left:24px;
    padding-right:24px;
    border-bottom:1px solid ${color.lighterGray};
    height:201px;

    @media ${deviceMax.md} {
        height:unset;
    }
`

export const Title = styled.div`
    font-size:24px;
    font-weight:600;
    margin-bottom:8px;
`

export const Description = styled.div`
    color: ${color.darkerGray};
    margin-bottom:16px;

    @media ${deviceMax.md} {
        margin-bottom:8px;
        font-size:14px;
    }
`

export const Search = styled.div`

    & input {
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
    }

    @media ${deviceMax.md} {
        & input {
            margin-top:4px;
        }
    }

`

export const MailList = styled.div`
    flex:1;
    overflow-y:auto;
    max-height:calc(100vh - 201px);


    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius:10px;
    }

    &:hover::-webkit-scrollbar-thumb {
        background:${color.gray};
    }

    @media ${deviceMax.md} {
        overflow-y:unset;
        max-height:unset;
    }
`

export const MailItem = styled.div<{active?: string}>`
    padding:24px;

    border-bottom:1px solid ${color.lighterGray};
    cursor:pointer;
    &:hover {
        background:${Hex2Rgba(color.primary, 0.1)};
    }

    ${props => props.active === "true" && `
        background:${Hex2Rgba(color.primary, 0.1)};
    `}
`

export const MailItemUpper = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:8px;
`

export const Sender = styled.div`
    color: ${color.darkerGray};
    font-weight:600;
`

export const Date = styled.div`
    color: ${color.primary};
    font-size:12px;
    font-weight:700;
`

export const MailItemLower = styled.div`

`

export const Subject = styled.div`
    font-size:18px;
    font-weight:700;

`

export const Message = styled.div`
    font-size:14px;
    color: ${color.darkerGray};
`

export const UpperHead = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:40px;

    @media ${deviceMax.md} {
        margin-top:16px;
    }
`

export const Refresh = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background:${color.lighterMain};
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    color: ${color.primary};
    font-size:18px;

    &:hover {
        background:${color.lighterGray};
        color: ${color.darkerGray};
    }
`