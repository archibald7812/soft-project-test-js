import classnames from 'classnames';
import styles from './styles.module.css'

export const NavPanel = () => {
	return (
		<div className={classnames(styles.root)}>
			<button>Posts</button>
			<button>Albums</button>
			<button>Todos</button>
		</div>
	)
}