import styled from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Popup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: rgba(17, 24, 39, 0.64);
    z-index: 12;
    display:flex;
`

export const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:1;
`

export const Dialog = styled.div`
    position: relative;
    width:700px;
    max-width:100%;
    max-height:100%;
    z-index:2;
    color: ${color.black};
    padding:25px;
    border-radius: 8px;

        background: ${Hex2Rgba(color.white,1)};



    overflow-y: auto;
    display:flex;
    flex-direction:column;

    @media ${deviceMax.sm}{
        width:100%;
    }

    overflow:auto;
    margin:auto;

    box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
                
`


export const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    cursor:default;
    user-select:none;
`
export const DialogTitle = styled.div`
    font-size:14px;
    display:flex;
`
export const DialogTitleIcon = styled.div`
    & svg{
        width:20px;
        height:20px;
    }
    margin-right:10px;
`
export const DialogTitleText = styled.div`

`
export const DialogClose = styled.div`
    margin-left: auto;
    cursor: pointer;
    font-size: 24px;
    padding:10px 20px;
    padding-right:0px;
`
export const DialogBody = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    transition:none;
`