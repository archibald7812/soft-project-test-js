import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import classnames from 'classnames';
import styles from './styles.module.css'
import { updatePost } from "../../features/posts/actions";
import { selectPostById } from "../../features/posts/selectors";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";

export const SinglePost = () => {

	const { postId } = useParams()

	const post = useSelector((state) => selectPostById(state, Number(postId)))

	const [title, setTitle] = useState(post?.title)
	const [content, setContent] = useState(post?.body)
	const [userId, setUserId] = useState(post?.userId)
	const [requestStatus, setRequestStatus] = useState(loadingStatuses.IDLE)

	const dispatch = useDispatch()

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	const onTitleChanged = e => setTitle(e.target.value)
	const onContentChanged = e => setContent(e.target.value)

	const canSave = [title, content, userId].every(Boolean) && requestStatus === loadingStatuses.IDLE;

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus(loadingStatuses.LOADING)
				dispatch(updatePost({
					id: post.id,
					title,
					body: content,
					userId
				}))
				setTitle('')
				setContent('')
				setUserId('')
			} catch (err) {
				console.error('Failed to save the post', err)
			} finally {
				setRequestStatus(loadingStatuses.IDLE)
			}
		}
	}

	return (
		<section className={classnames(styles.root)}>
			<div className={classnames(styles.topPanel)}>
				<Link to={'/posts'} className={classnames(styles.back)}>Back</Link>
				<h2 className={classnames(styles.title)}>Edit Post</h2>
			</div>

			<form className={classnames(styles.editForm)}>
				<label className={classnames(styles.label)}>Post Title:</label>
				<input
					className={classnames(styles.area, styles.input)}
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label className={classnames(styles.label)}>Content:</label>
				<textarea
					rows='8'
					className={classnames(styles.area)}
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button
					className={classnames(styles.button)}
					type="button"
					onClick={onSavePostClicked}
					disabled={!canSave}
				>
					Save Post
				</button>
			</form>
		</section>
	)
}