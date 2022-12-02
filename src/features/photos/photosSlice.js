import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { fetchPhotos } from "./actions";

const initialState = {
	photos: [],
	status: loadingStatuses.IDLE,
}

export const photosSlice = createSlice({
	name: 'photos',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchPhotos.pending, (state) => {
				state.status = loadingStatuses.LOADING
			})
			.addCase(fetchPhotos.fulfilled, (state, action) => {
				state.status = loadingStatuses.SUCCESS

				if (state.photos.length) return

				state.photos = action.payload
			})
			.addCase(fetchPhotos.rejected, (state, action) => {
				state.status = loadingStatuses.FAIL
				state.error = action.error.message
			})
	}
})

export default photosSlice.reducer;