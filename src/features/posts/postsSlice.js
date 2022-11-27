import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

const initialState = {
	posts: [],
	status: 'idle',
	error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get(POSTS_URL)
	return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
	const response = await axios.post(POSTS_URL, initialPost)
	return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
		return response.data
	} catch (err) {
		return initialPost;
	}
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.delete(`${POSTS_URL}/${id}`)
		if (response?.status === 200) return initialPost;
		return `${response?.status}: ${response?.statusText}`;
	} catch (err) {
		return err.message;
	}
})

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'
				state.posts = state.posts.concat(payload)
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed'
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
					console.log('Update could not complete')
					console.log(action.payload)
					return;
				}
				const { id } = action.payload;
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = [...posts, action.payload];
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Delete could not complete')
					console.log(action.payload)
					return;
				}
				const { id } = action.payload;
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = posts;
			})
	}
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
	state.posts.posts.find(post => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
