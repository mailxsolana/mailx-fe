import styled from "styled-components"
import { deviceMax, deviceMin } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const MessageMailContent = styled.div`
    flex:1;

    @media ${deviceMin.md} {
        max-height:100vh;
        overflow-y:auto;

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
    }
`

export const Subject = styled.div`
    font-size:32px;
    font-weight:700;
    padding-top:40px;

    @media ${deviceMax.md} {
        font-size:24px;
        padding-top:16px;
    }

`

export const UpperContent = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:40px;
    align-items:center;

    @media ${deviceMax.md} {
        margin-top:16px;
    }
    
`

export const Upper = styled.div`
    padding-left:24px;
    padding-right:24px;
    height:201px;
    border-bottom:1px solid ${color.lighterGray};

    @media ${deviceMax.md} {
        height:unset;
    }
`

export const UpperLeft = styled.div`

`

export const Sender = styled.div`
    & span {
        color:${color.darkerGray};
        font-size:14px;
    }
`

export const Date = styled.div`
    color:${color.primary};
    font-size:14px;
`

export const UpperRight = styled.div`
    display:flex;

    & > *:not(:last-child) {
        margin-right:16px;
    }
`

export const Delete = styled.div`
    color:${color.danger};
    background:${color.dangerLight};
    border-radius:100%;
    width:40px;
    height:40px;
    padding:8px 16px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`

export const Close = styled.div`
    color:${color.gray};
    background:${color.lighterGray};
    border-radius:100%;
    width:40px;
    height:40px;
    padding:8px 16px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;

    &:hover {
        background:${color.darkerGray};
    }
`

export const Message = styled.div`
    color:${color.darkerGray};
    padding:24px;

    @media ${deviceMax.md} {
        padding-top:8px;
    }
`

export const Loading = styled.div`
    padding:24px;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    margin-top:40px;
    font-size:24px;
    color:${color.primary};
`