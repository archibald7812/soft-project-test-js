import { Posts } from "../../components/Posts/Posts"
import classnames from 'classnames';
import styles from './styles.module.css'

export const HomePage = () => {
	return (
		<div className={classnames(styles.root)}>
			<h1>Posts:</h1>
			<Posts />
		</div>
	)
}