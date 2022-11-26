import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Album } from "../../components/Album/Album"
import styles from './styles.module.css';
import classNames from 'classnames';
import { fetchPhotos } from '../../features/photos/photosSlice';

export const AlbumsPage = () => {

	const dispatch = useDispatch()

	const albums = useSelector((state) => {
		return state.albums.albums
	})

	const photos = useSelector((state) => {
		return state.photos.photos
	})

	const arrayOfUrls = []

	for (let album of albums) {
		arrayOfUrls.push(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
	}

	useEffect(() => {
		dispatch(fetchPhotos(arrayOfUrls))
	}, [])

	const state = useSelector(state => state)
	console.log(state)

	return (
		<div className={classNames(styles.root)}>
			<h1 className={classNames(styles.title)}>Albums</h1>
			<div className={classNames(styles.section)}>
				{photos.map(item => {
					return <Album key={item[0].albumId} slides={item} />
				})}</div>
		</div>
	)
}