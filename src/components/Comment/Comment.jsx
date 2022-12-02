import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCommentByPostId } from '../../features/comments/selectors';
import { Comments } from '../Comments/Comments';
import styles from './styles.module.css'

export const Comment = ({ comment, commentId, depth }) => {

	const comments = useSelector(state => selectCommentByPostId(state, commentId))

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
				<button className={classnames(styles.button)} onClick={onComment}>Comments ({depth < 4 ? comments.length : 0})</button>
				<p className={classnames(styles.email)}>Email: {comment.email}</p>
			</div>
			{active && depth < 4 ? <Comments active={active} depth={depth} postId={commentId} /> : null}
		</div>
	)
}