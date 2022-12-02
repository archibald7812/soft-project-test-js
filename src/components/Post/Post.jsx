import classnames from 'classnames';
import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Comments } from '../Comments/Comments';
import { useState } from 'react';
import { selectUserNameById } from '../../features/users/selectors';
import { deletePost } from '../../features/posts/actions';
import { selectCommentByPostId } from '../../features/comments/selectors';

export const Post = ({ postId, title = '', userId = 1, body = '' }) => {

	const dispatch = useDispatch()

	const [active, setActive] = useState(false)

	const user = useSelector((state) => selectUserNameById(state, userId))

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

	let count = 1

	return (
		<div className={classnames(styles.root)}>
			<Link to={`edit/${postId}`} className={classnames(styles.title)}>{title.toUpperCase()}</Link>
			<p className={classnames(styles.body)}>Text: {body}</p>
			<div className={classnames(styles.bottom)}>
				<button className={classnames(styles.button)} onClick={onComment}>Comments</button>
				<Link to={`edit/${postId}`}><button className={classnames(styles.button)}>Edit post</button></Link>
				<button className={classnames(styles.button)} onClick={onDelete}>Delete Post</button>
				<div>Author: {user?.name}</div>
			</div>
			{active ? <Comments postId={postId} active={active} depth={count} /> : null}
		</div>
	)
}

