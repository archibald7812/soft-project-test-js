import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { fetchAlbums } from "./actions";

const initialState = {
	albums: [],
	status: loadingStatuses.IDLE,
}

export const albumsSlice = createSlice({
	name: 'albums',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchAlbums.pending, (state) => {
				state.status = loadingStatuses.LOADING
			})
			.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
				state.status = loadingStatuses.SUCCESS

				if (state.albums.length) return

				state.albums = payload
			})
			.addCase(fetchAlbums.rejected, (state, action) => {
				state.status = loadingStatuses.FAIL
				state.error = action.error.message
			})
	}

})

export default albumsSlice.reducer;