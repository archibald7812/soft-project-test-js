import { Post } from "../Post/Post"
import { posts } from "../../constants/data/posts"
import classnames from 'classnames';
import styles from './styles.module.css'

export const Posts = () => {
	return (
		<div className={classnames(styles.root)}>
			{posts.map(post => {
				return <Post key={post.id} title={post.title} userId={post.userId} body={post.body} />
			})}
		</div>
	)
}