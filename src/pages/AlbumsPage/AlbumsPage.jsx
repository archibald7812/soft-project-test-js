import { useSelector } from "react-redux";
import { Album } from "../../components/Album/Album"
import styles from './styles.module.css';
import classNames from 'classnames';

export const AlbumsPage = () => {

	const photos = useSelector((state) => {
		return state.photos.photos
	})

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