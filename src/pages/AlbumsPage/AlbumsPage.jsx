import { Album } from "../../components/Album/Album"
import { photos } from "../../constants/data/photos";

export const AlbumsPage = () => {
	return (
		<div>
			<h1>Albums</h1>
			<Album slides={photos} />
		</div>
	)
}