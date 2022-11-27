import classnames from 'classnames';
import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/posts/postsSlice";
import { Link } from "react-router-dom";


export const Post = ({ postId, title = '', userId = 1, body = '' }) => {

	const dispatch = useDispatch()
	const comments = useSelector(state => state.comments.comments)
	const currentPostComments = []
	const onComment = (event) => {
		event.preventDefault()
		currentPostComments.push([...comments.filter(item => item.postId === postId)])
	}

	const onDelete = (event) => {
		event.preventDefault();

		dispatch(deletePost({
			id: postId
		}))
	}

	return (
		<div className={classnames(styles.root)}>
			<Link to={`edit/${postId}`} className={classnames(styles.title)}>{title.toUpperCase()}</Link>
			<p className={classnames(styles.body)}>Text: {body}</p>
			<div className={classnames(styles.bottom)}>
				<button className={classnames(styles.button)} onClick={onComment}>Comments</button>
				<Link to={`edit/${postId}`}><button className={classnames(styles.button)}>Edit post</button></Link>
				<button className={classnames(styles.button)} onClick={onDelete}>Delete Post</button>
				<div>Author: User {userId}</div>
			</div>
		</div>
	)
}

