import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadingApi } from '../../api/axios/axios'
import { store } from '../../app/store'

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {

	const albums = store.getState().albums.albums

	if (albums.length) return

	const result = await loadingApi.get('/albums')

	return result.data
})