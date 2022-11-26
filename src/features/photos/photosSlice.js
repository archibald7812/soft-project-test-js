import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	photos: [],
	status: 'idle',
}

export const fetchPhotos = createAsyncThunk('albums/fetchPhotos', async (array) => {
	const arrayOfaxios = []
	array.forEach(element => {
		arrayOfaxios.push(axios.get(element))
	});
	const result = await Promise.all(arrayOfaxios)

	return result.map(item => item.data)
})

export const photosSlice = createSlice({
	name: 'photos',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPhotos.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchPhotos.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'
				state.photos = payload
			})
			.addCase(fetchPhotos.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}

})

export default photosSlice.reducer;