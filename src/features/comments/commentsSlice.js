import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COMMENTS_URL = `https://jsonplaceholder.typicode.com/comments`;

const initialState = {
	comments: [],
	status: 'idle',
	error: null
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
	const response = await axios.get(COMMENTS_URL)
	return response.data
})

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchComments.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchComments.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'
				state.comments = state.comments.concat(payload)
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const selectCommentById = (state, commentId) => {
	state.comments.comments.find(comment => comment.id === commentId)
};

export default commentsSlice.reducer
