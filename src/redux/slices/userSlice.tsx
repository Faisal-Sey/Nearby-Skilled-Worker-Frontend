import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    id: string,
    username: string,
    bio?: string,
    coverPicture?: string,
    email?: string,
    name: string,
    profilePicture?: string,
    isVerified: number,
    type: string,
    deleted: number,
    token: string,
    expiresIn: number,
    lat: number,
    long: number
}

export const initialState: UserState = {
    id: "",
    username: "",
    name: "",
    isVerified: 0,
    type: "",
    deleted: 0,
    token: "",
    expiresIn: 0,
    lat: 0,
    long: 0 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer