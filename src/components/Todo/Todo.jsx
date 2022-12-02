import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../features/todos/actions';
import styles from './styles.module.css'

export const Todo = ({ title, id, status, index }) => {

	const dispatch = useDispatch()

	const onDelete = (event) => {
		event.preventDefault();

		dispatch(
			deleteTodo({
				id: id,
				completed: status
			})
		);
	};

	return (
		<div className={classnames(styles.root)}>
			<p className={classnames(styles.title)}>{index + 1}. {title}</p>
			<div className={classnames(styles.box)}>
				<button className={classnames(styles.button)} onClick={onDelete}>Delete</button>
			</div>
		</div>
	)
}