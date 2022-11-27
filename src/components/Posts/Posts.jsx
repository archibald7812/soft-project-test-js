import { Post } from "../Post/Post"
import classnames from 'classnames';
import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../../features/posts/postsSlice";
import { fetchComments } from "../../features/comments/sommentsSlice";
import { useEffect } from 'react';

export const Posts = () => {

	const posts = useSelector(selectAllPosts)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchComments())
	}, [])
	return (
		<div className={classnames(styles.root)}>
			{posts.map(post => {
				return <Post key={post.id} title={post.title} userId={post.userId} body={post.body} postId={post.id} />
			})}
		</div>
	)
}