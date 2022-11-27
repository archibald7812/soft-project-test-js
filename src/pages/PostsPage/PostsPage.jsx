import { Posts } from "../../components/Posts/Posts"
import classnames from 'classnames';
import styles from './styles.module.css'
import classNames from 'classnames';
import { Link } from "react-router-dom";

export const PostsPage = () => {
	return (
		<div className={classnames(styles.root)}>
			<div className={classnames(styles.topPanel)}>
				<h1 className={classNames(styles.title)}>
					Posts
				</h1>
				<Link to='add' ><button className={classNames(styles.button)}>Add post</button></Link>
			</div>
			<Posts />
		</div>
	)
}