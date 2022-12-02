import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingApi } from "../../api/axios/axios";
import { store } from "../../app/store";

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {

	const comments = store.getState().comments.comments

	if (comments.length && comments.find(comment => comment.postId === postId)) {
		return postId
	}

	const response = await loadingApi.get(`/comments?postId=${postId}`)

	return response.data
})