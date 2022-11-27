import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../features/posts/postsSlice";
import classnames from 'classnames';
import styles from './styles.module.css'

export const AddPost = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')
	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const onTitleChanged = e => setTitle(e.target.value)
	const onContentChanged = e => setContent(e.target.value)

	const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setAddRequestStatus('pending')
				dispatch(addNewPost({ title, body: content, userId })).unwrap()

				setTitle('')
				setContent('')
				setUserId('')
			} catch (err) {
				console.error('Failed to save the post', err)
			} finally {
				setAddRequestStatus('idle')
			}
		}
	}

	return (
		<section className={classnames(styles.root)}>
			<h2 className={classnames(styles.title)}>New Post</h2>
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
					className={classnames(styles.area, styles.input)}
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
				>Save Post</button>
			</form>
		</section>
	)
}
