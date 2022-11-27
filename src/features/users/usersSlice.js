import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: [],
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.users = state.users.concat(payload)
            })
    }
})

export const selectUserNameById = (state, userId) => {
    return (state.users.users).find(user => user.id === userId)
}

export default usersSlice.reducer