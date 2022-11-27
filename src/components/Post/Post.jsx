import classnames from 'classnames';
import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { Comments } from '../Comments/Comments';
import { useState } from 'react';
import { selectUserNameById } from '../../features/users/usersSlice';


export const Post = ({ postId, title = '', userId = 1, body = '' }) => {

	const user = useSelector((state) => selectUserNameById(state, userId))
	console.log(user)
	const dispatch = useDispatch()

	const comments = useSelector(state => state.comments.comments)

	const [active, setActive] = useState(false)

	const currentPostComments = comments.filter(item => item.postId === postId)

	const onComment = (event) => {
		event.preventDefault()

		setActive((active) => !active)
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
				<button className={classnames(styles.button)} onClick={onComment}>Comments ({currentPostComments.length})</button>
				<Link to={`edit/${postId}`}><button className={classnames(styles.button)}>Edit post</button></Link>
				<button className={classnames(styles.button)} onClick={onDelete}>Delete Post</button>
				<div>Author: {user.name}</div>
			</div>
			<Comments active={active} comments={currentPostComments} />
		</div>
	)
}

