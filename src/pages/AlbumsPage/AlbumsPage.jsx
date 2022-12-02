import { useSelector } from "react-redux";
import { Album } from "../../components/Album/Album"
import styles from './styles.module.css';
import classNames from 'classnames';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAlbums } from "../../features/albums/actions";
import { fetchPhotos } from "../../features/photos/actions";

export const AlbumsPage = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAlbums())
	}, [])

	const albums = useSelector((state) => {
		return state.albums.albums
	})

	const arrayOfUrls = []

	for (let album of albums) {
		arrayOfUrls.push(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
	}

	useEffect(() => {
		dispatch(fetchPhotos(arrayOfUrls))
	}, [albums])

	const photos = useSelector((state) => {
		return state.photos.photos
	})

	return (
		<div className={classNames(styles.root)}>
			<h1 className={classNames(styles.title)}>Albums</h1>
			<div className={classNames(styles.section)}>
				{photos.map(item => {
					return <Album key={item[0].albumId} slides={item} albumId={item[0].albumId} />
				})}</div>
		</div>
	)
}