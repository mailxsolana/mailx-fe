import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
    cloudWallet: any | null,
    mailAccount: any | null,
    balance: any,
    currentMail: any,

    refreshInbox: boolean,
    refreshSent: boolean,
    mailPage: string,

    customDomain: any,
    createForSomeone: boolean,
    mailAccountCreationRequests: any,
    refreshAccountsDashboard: boolean,

    mailDeletionRequests:any,
    sentMails: any,
    inboxMails: any,

    currentWallet: any,
}

const initialState: DataState = {
    cloudWallet: null,
    mailAccount: null,
    balance: "",
    currentMail: null,

    refreshInbox: false,
    refreshSent: false,
    mailPage: "inbox",

    customDomain: null,
    createForSomeone: false,
    mailAccountCreationRequests: [],
    refreshAccountsDashboard: false,

    mailDeletionRequests: [],
    sentMails: [],
    inboxMails: [],

    currentWallet: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCloudWallet: (state, action: PayloadAction<any>) => {
            state.cloudWallet = action.payload
        },
        setMailAccount: (state, action: PayloadAction<any>) => {
            state.mailAccount = action.payload
        },
        setBalance: (state, action: PayloadAction<any>) => {
            state.balance = action.payload
        },
        setCurrentMail: (state, action: PayloadAction<any>) => {
            state.currentMail = action.payload
        },
        setRefreshInbox: (state, action: PayloadAction<boolean>) => {
            state.refreshInbox = action.payload
        },
        setRefreshSent: (state, action: PayloadAction<boolean>) => {
            state.refreshSent = action.payload
        },
        setMailPage: (state, action: PayloadAction<string>) => {
            state.mailPage = action.payload
        },
        setCustomDomain: (state, action: PayloadAction<any>) => {
            state.customDomain = action.payload
        },
        setCreateForSomeone: (state, action: PayloadAction<boolean>) => {
            state.createForSomeone = action.payload
        },
        setMailAccountCreationRequests: (state, action: PayloadAction<any>) => {
            state.mailAccountCreationRequests = action.payload
        },
        setRefreshAccountsDashboard: (state, action: PayloadAction<boolean>) => {
            state.refreshAccountsDashboard = action.payload
        },
        setMailDeletionRequests: (state, action: PayloadAction<any>) => {
            state.mailDeletionRequests = action.payload
        },
        setSentMails: (state, action: PayloadAction<any>) => {
            state.sentMails = action.payload
        },
        setInboxMails: (state, action: PayloadAction<any>) => {
            state.inboxMails = action.payload
        },
        setCurrentWallet: (state, action: PayloadAction<any>) => {
            state.currentWallet = action.payload
        },
    }
})

export const { setCloudWallet, setMailAccount, setBalance, setCurrentMail, setRefreshInbox, setRefreshSent, setMailPage, setCustomDomain, setCreateForSomeone, setMailDeletionRequests, setCurrentWallet, setMailAccountCreationRequests, setRefreshAccountsDashboard, setSentMails, setInboxMails } = dataSlice.actions

export default dataSlice.reducer