import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { fetchComments } from "./actions";

const initialState = {
	comments: [],
	status: loadingStatuses.IDLE,
	error: null
}

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = 'succeeded'
				if (state.comments.length && state.comments.find(comment => comment.postId === action.payload)) {
					return
				}
				state.comments = state.comments.concat(action.payload)
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export default commentsSlice.reducer
