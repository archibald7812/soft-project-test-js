import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comments } from '../Comments/Comments';
import styles from './styles.module.css'

export const Comment = ({ comment, commentId }) => {

	const comments = useSelector(state => state.comments.comments)
	const currentCommentComments = comments.filter(item => item.postId === commentId)
	const [active, setActive] = useState(false)


	const onComment = (event) => {
		event.preventDefault()

		setActive((active) => !active)
	}

	return (
		<div className={classnames(styles.root)}>
			<h4 className={classnames(styles.title)}>{comment.name}</h4>
			<p className={classnames(styles.body)}>{comment.body}</p>
			<div className={classnames(styles.box)}>
				<button className={classnames(styles.button)} onClick={onComment}>Comments ({currentCommentComments.length})</button>
				<p className={classnames(styles.email)}>Email: {comment.email}</p>
			</div>
			<Comments active={active} comments={currentCommentComments} />
		</div>
	)
}