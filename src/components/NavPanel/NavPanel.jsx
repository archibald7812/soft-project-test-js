import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

export const NavPanel = () => {
	return (
		<div className={classnames(styles.root)}>
			<Link to='/'>Home</Link>
			<Link to='/posts'>Posts</Link>
			<Link to='/todos'>Todos</Link>
		</div>
	)
}