import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { addNewPost, deletePost, fetchPosts, updatePost } from "./actions";

const initialState = {
	posts: [],
	status: loadingStatuses.IDLE,
	error: null
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = loadingStatuses.LOADING
			})
			.addCase(fetchPosts.fulfilled, (state, { payload }) => {
				state.status = loadingStatuses.SUCCESS
				if (state.posts.length) return
				state.posts = payload
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = loadingStatuses.FAIL
				state.error = action.error.message
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				const sortedPosts = state.posts.sort((a, b) => {
					if (a.id > b.id) return 1
					if (a.id < b.id) return -1
					return 0
				})
				action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
				action.payload.userId = Number(action.payload.userId)
				state.posts.push(action.payload)
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log(action.payload)
					return;
				}
				const { id } = action.payload;
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = [...posts, action.payload];
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log(action.payload)
					return;
				}
				const { id } = action.payload;
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = posts;
			})
	}
})

export default postsSlice.reducer
