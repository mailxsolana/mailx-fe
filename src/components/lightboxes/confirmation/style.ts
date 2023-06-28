import styled from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Confirmation = styled.div`

`

export const ConfirmationIcon = styled.div`
    display:flex;
    justify-content:center;

    & div{
        width:64px;
        height:64px;
        border-radius:50%;
        background:${color.dangerLight};
        color:${color.danger};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:32px;
    }
`
export const ConfirmationContent = styled.div`
    margin-top:24px;
    margin-bottom:32px;
    text-align:center;
    font-size:20px;
    font-weight:600;
`

export const ConfirmationActions = styled.div`
    display:flex;
`

export const ConfirmationAction = styled.button<{btnaction?:string}>`
    flex:1;
    border-radius: 68px;
    font-weight: 600;
    font-size: 16px;
    outline:none;
    padding:16px;
    border:2px solid ${color.primary};
    &:not(:last-child){
        margin-right:16px;
    }
    cursor:pointer;

    ${props => props.btnaction === "accept" && `
        background: linear-gradient(45deg, #3166DF 0%, #4A7FF6 100%);
        color:${color.white};

        &:hover {
            background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
            box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        }
    `}

    ${props => props.btnaction === "reject" && `
        background: ${color.white};
        color:${color.primary};

        &:hover{
            box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        }
    `}
`