import { backendUrl } from "../../constants/URL"
import classnames from 'classnames';
import styles from './styles.module.css'

export const Post = ({ title = '', userId = 1, body = '' }) => {
	/* 
		const url = new URL('posts/1/comments', backendUrl)
	
		fetch(url).then(response => response.json()).then(result => {
			const data = result
			console.log(data)
		}
		) */

	return (
		<div className={classnames(styles.root)}>
			<h2 className={classnames(styles.title)}>Title: {title.toUpperCase()}</h2>
			<p className={classnames(styles.body)}>Text: {body}</p>
			<div className={classnames(styles.bottom)}>
				<button>Comments</button>
				<div>Author: User {userId}</div>
			</div>

		</div>
	)
}

