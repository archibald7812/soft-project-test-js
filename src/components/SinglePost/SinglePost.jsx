import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectPostById, updatePost } from "../../features/posts/postsSlice"
import { useState } from "react";
import classnames from 'classnames';
import styles from './styles.module.css'

export const SinglePost = () => {

	const { postId } = useParams()

	const post = useSelector((state) => selectPostById(state, Number(postId)))

	const [title, setTitle] = useState(post?.title)
	const [content, setContent] = useState(post?.body)
	const [userId, setUserId] = useState(post?.userId)
	const [requestStatus, setRequestStatus] = useState('idle')

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

	const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus('pending')
				dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()
				setTitle('')
				setContent('')
				setUserId('')
			} catch (err) {
				console.error('Failed to save the post', err)
			} finally {
				setRequestStatus('idle')
			}
		}
	}

	return (
		<section className={classnames(styles.root)}>
			<h2 className={classnames(styles.title)}>Edit Post</h2>
			<form className={classnames(styles.editForm)}>
				<label className={classnames(styles.label)} htmlFor="postTitle">Post Title:</label>
				<input
					className={classnames(styles.area, styles.input)}
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label className={classnames(styles.label)} htmlFor="postContent">Content:</label>
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