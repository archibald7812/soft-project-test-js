import { Posts } from "../../components/Posts/Posts"
import classnames from 'classnames';
import styles from './styles.module.css'
import classNames from 'classnames';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../features/posts/actions";
import { fetchUsers } from "../../features/users/actions";

export const PostsPage = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts());
	}, [])

	useEffect(() => {
		dispatch(fetchUsers());
	}, [])

	/* 	useEffect(() => {
			dispatch(fetchComments());
		}, []) */

	return (
		<div className={classnames(styles.root)}>
			<div className={classnames(styles.topPanel)}>
				<h1 className={classNames(styles.title)}>
					Posts
				</h1>
				<Link to='create' ><button className={classNames(styles.button)}>Add post</button></Link>
			</div>
			<Posts />
		</div>
	)
}