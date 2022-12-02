import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { fetchUsers } from "./actions";

const initialState = {
    users: [],
    status: loadingStatuses.IDLE,
    error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = loadingStatuses.LOADING
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = loadingStatuses.SUCCESS
                if (state.users.length) return
                state.users = action.payload
            })
    }
})

export default usersSlice.reducer