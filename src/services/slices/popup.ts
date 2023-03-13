import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PopupState {
    unlockPopup: boolean,
    sendPopup: boolean,
    depositPopup: boolean,
    withdrawPopup: boolean,
    customDomainPopup: boolean,
    mailAccountRequestsPopup: boolean,
}

const initialState: PopupState = {
    unlockPopup: false,
    sendPopup: false,
    depositPopup: false,
    withdrawPopup: false,
    customDomainPopup: false,
    mailAccountRequestsPopup: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showUnlockPopup: (state, action: PayloadAction<boolean>) => {
            state.unlockPopup = action.payload
        },
        showSendPopup: (state, action: PayloadAction<boolean>) => {
            state.sendPopup = action.payload
        },
        showDepositPopup: (state, action: PayloadAction<boolean>) => {
            state.depositPopup = action.payload
        },
        showWithdrawPopup: (state, action: PayloadAction<boolean>) => {
            state.withdrawPopup = action.payload
        },
        showCustomDomainPopup: (state, action: PayloadAction<boolean>) => {
            state.customDomainPopup = action.payload
        },
        showMailAccountRequestsPopup: (state, action: PayloadAction<boolean>) => {
            state.mailAccountRequestsPopup = action.payload
        }
    }
})

export const { showUnlockPopup, showSendPopup, showDepositPopup, showWithdrawPopup,showCustomDomainPopup, showMailAccountRequestsPopup } = popupSlice.actions

export default popupSlice.reducer