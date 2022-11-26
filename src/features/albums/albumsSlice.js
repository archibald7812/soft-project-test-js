import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';


const initialState = {
	albums: [],
	status: 'idle',
}

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
	const result = await axios.get(ALBUMS_URL)
	return result.data
})

export const albumsSlice = createSlice({
	name: 'albums',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchAlbums.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'
				state.albums = payload
			})
			.addCase(fetchAlbums.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}

})

export default albumsSlice.reducer;