
export const selectAlbumById = (state, albumId) => {

	return state.albums.albums.filter(item => item.id === albumId)
}