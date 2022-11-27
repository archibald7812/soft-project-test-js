import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

export const NavPanel = () => {
	return (
		<div className={classnames(styles.root)}>
			<Link to='/' className={classnames(styles.title)}>Home</Link>
			<Link to='/posts' className={classnames(styles.title)}>Posts</Link>
			<Link to='/albums' className={classnames(styles.title)}>Albums</Link>
			<Link to='/todos' className={classnames(styles.title)}>Todos</Link>
		</div>
	)
}