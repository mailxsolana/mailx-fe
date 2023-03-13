import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const EmptyMailContent = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    & img{
        max-width:480px;
        width:100%;
    }
    user-select:none;
    pointer-events:none;
`

export const Title = styled.div`
    text-align:center;
    color: ${color.gray};
    font-size:28px;
    margin-top:64px;
    font-weight:500;
    line-height:1.1;
    cursor:default;
    user-select:none;
`