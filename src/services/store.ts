import { configureStore } from "@reduxjs/toolkit"
import dataSliceReducer from "./slices/data"
import popupSliceReducer from "./slices/popup"

export const store = configureStore({
    reducer: {
        data: dataSliceReducer,
        popup: popupSliceReducer
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch