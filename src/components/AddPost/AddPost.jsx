import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import styles from './styles.module.css'
import { addNewPost } from "../../features/posts/actions";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { Link } from "react-router-dom";

export const AddPost = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')
	const [addRequestStatus, setAddRequestStatus] = useState(loadingStatuses.IDLE)

	const onTitleChanged = e => setTitle(e.target.value)
	const onContentChanged = e => setContent(e.target.value)
	const onAuthorChanged = e => setUserId(e.target.value)

	const canSave = [title, content].every(Boolean) && addRequestStatus === loadingStatuses.IDLE;

	const users = useSelector(state => state.users.users)

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setAddRequestStatus(loadingStatuses.LOADING)
				dispatch(addNewPost({
					title,
					body: content,
					userId
				})).unwrap()
				setTitle('')
				setContent('')
				setUserId('')
			} catch (err) {
				console.error('Failed to save the post', err)
			} finally {
				setAddRequestStatus(loadingStatuses.IDLE)
			}
		}
	}

	const usersOptions = users.map(user => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	return (
		<section className={classnames(styles.root)}>
			<div className={classnames(styles.topPanel)}>
				<Link to={'/posts'} className={classnames(styles.back)}>Back</Link>
				<h2 className={classnames(styles.title)}>New Post</h2>
			</div>
			<form className={classnames(styles.editForm)}>
				<label className={classnames(styles.label)}>Post Title:</label>
				<input
					className={classnames(styles.area, styles.input)}
					type="text"
					value={title}
					onChange={onTitleChanged}
				/>
				<label className={classnames(styles.label)}>User:</label>
				<select className={classnames(styles.area, styles.input)} value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label className={classnames(styles.label)}>Content:</label>
				<textarea
					className={classnames(styles.area, styles.input)}
					value={content}
					onChange={onContentChanged}
				/>
				<button
					className={classnames(styles.button)}
					onClick={onSavePostClicked}
					disabled={!canSave}
				>Save Post</button>
			</form>
		</section>
	)
}
