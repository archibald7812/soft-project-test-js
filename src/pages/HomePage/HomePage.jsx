import classnames from 'classnames';
import styles from './styles.module.css'

export const HomePage = () => {
	return (
		<div className={classnames(styles.root)}>
			<h1 className={classnames(styles.title)}>Hello</h1>
			<h3 className={classnames(styles.body)}>Here you can manage posts, albums and todos</h3>
		</div>
	)
}