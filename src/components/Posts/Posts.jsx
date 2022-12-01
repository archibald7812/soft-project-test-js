import { Post } from "../Post/Post"
import classnames from 'classnames';
import styles from './styles.module.css'
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../features/posts/selectors";

export const Posts = () => {

	const posts = useSelector(selectAllPosts)

	return (
		<div className={classnames(styles.root)}>
			{posts.map(post => {
				return <Post key={post.id} title={post.title} userId={post.userId} body={post.body} postId={post.id} />
			})}
		</div>
	)
}