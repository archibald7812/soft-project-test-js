import { store } from "../../app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingApi } from "../../api/axios/axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {

	const { posts } = store.getState().posts;

	if (posts.length) {
		return
	}

	const response = await loadingApi.get('/posts')

	return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {

	const response = await loadingApi.post('/posts', JSON.stringify(initialPost))

	return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {

	const { id } = initialPost;

	try {
		const response = await loadingApi.put(`posts/${id}`, JSON.stringify(initialPost))
		return response.data
	} catch (err) {
		return initialPost;
	}
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {

	const { id } = initialPost;

	try {
		const response = await loadingApi.delete(`/posts/${id}`)

		if (response?.status === 200) return initialPost;

		return `${response?.status}: ${response?.statusText}`;
	} catch (err) {
		return err.message;
	}
})