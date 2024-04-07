import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ResetPasswordState {
    userId: string,
    iat: number,
    exp: number,
    email: string,
}

export const initialState: ResetPasswordState = {
    userId: "",
    iat: 0,
    exp: 0,
    email: "",
}

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        setResetPasswordData: (state, action: PayloadAction<ResetPasswordState>) => {
            Object.assign(state, action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setResetPasswordData } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer