import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingApi } from "../../api/axios/axios";
import { store } from "../../app/store";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

	const { users } = store.getState().users;

	if (users.length) {
		return
	}
	const response = await loadingApi.get('/users');

	return response.data
})
