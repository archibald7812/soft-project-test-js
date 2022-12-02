import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingApi } from "../../api/axios/axios";
import { store } from "../../app/store";

export const fetchPhotos = createAsyncThunk('albums/fetchPhotos', async (array) => {

	const photos = store.getState().photos.photos

	if (photos.length) return

	const arrayOfaxios = []
	array.forEach(element => {
		arrayOfaxios.push(loadingApi.get(element))
	});
	const result = await Promise.all(arrayOfaxios)

	return result.map(item => item.data)
})