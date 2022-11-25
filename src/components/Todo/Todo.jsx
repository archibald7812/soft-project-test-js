import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteTodo, completeTodo } from '../../features/todos/todosSlice';
import styles from './styles.module.css'

export const Todo = ({ title, status, id }) => {

	const dispatch = useDispatch()

	const onDelete = (event) => {
		event.preventDefault();

		dispatch(
			deleteTodo({
				id: id
			})
		);
	};

	const onDone = (event) => {
		event.preventDefault();

		dispatch(
			completeTodo({
				id: id
			})
		);
	};

	return (
		<div className={classnames(styles.root)}>
			<p className={classnames(styles.title)}>{title}</p>
			<button className={classnames(styles.button)} onClick={onDelete}>Delete</button>
			{!status && <button onClick={onDone}>Done!</button>}
		</div>
	)
}