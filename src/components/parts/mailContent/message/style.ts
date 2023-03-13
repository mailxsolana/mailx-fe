import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const MessageMailContent = styled.div`
    flex:1;
    
`   

export const Subject = styled.div`
    font-size:32px;
    font-weight:700;
    padding-top:40px;
`

export const UpperContent = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:40px;
    align-items:center;
    
`

    export const Upper = styled.div`
    padding-left:24px;
    padding-right:24px;
    height:201px;
    border-bottom:1px solid ${color.lighterGray};
`

export const UpperLeft = styled.div`

`

export const Sender = styled.div`

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