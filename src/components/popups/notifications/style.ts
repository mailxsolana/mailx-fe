import styled from "styled-components"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"
import { Dialog, DialogHeader } from "../base/style"

export const Popup = styled.div`
    & ${Dialog} {
        width: 520px;
        padding-left: 0;
        padding-right: 0;
    }

    & ${DialogHeader} {
        padding-left: 24px;
        padding-right: 24px;
    }
`

export const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
`

export const Notification = styled.div`
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
        border-bottom: 1px solid ${color.lighterGray}
    }
    padding: 24px ;

    &:hover {
        background-color: #E8F2FA
    }
    cursor: pointer;
`

export const NotificationLeft = styled.div`

`

export const NotificationTitle = styled.div`
    margin-bottom: 8px;
    font-weight: 600;
    color: ${color.black};
`

export const NotificationDescription = styled.div`
    font-size: 14px;
`

export const NotificationDate = styled.div`
    color: ${color.primary};
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    margin-left: 4px;
`