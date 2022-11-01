import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userDetails: [],
    },
    reducers: {
        addAuth: (state, action) => {
            state.userDetails.push(action.payload)
        },
        reset: (state) => {
            state = initialState
        }
    }
})

export const { addAuth, reset } = authSlice.actions;
export default authSlice.reducer;