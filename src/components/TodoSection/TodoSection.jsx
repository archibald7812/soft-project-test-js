import classnames from 'classnames';
import styles from './styles.module.css'
import { Todo } from '../Todo/Todo';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from '../../features/todos/todosSlice';
import { useEffect } from 'react';

export const TodoSection = () => {

	const dispatch = useDispatch()

	const todos = useSelector((state) => {
		return state.todos.todos;
	});

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	return (
		<div className={classnames(styles.root)}>
			<div className={classnames(styles.section)}>
				<h3 className={classnames(styles.title)}>Active</h3>
				<div className={classnames(styles.column)}>
					{todos.map(item => {
						if (item.completed === false) {
							return <Todo key={item.id} title={item.title} status={item.completed} id={item.id} />
						}
					})}
				</div>
			</div>
			<div className={classnames(styles.section)}>
				<h3 className={classnames(styles.title)}>Completed</h3>
				<div className={classnames(styles.column)}>
					{todos.map(item => {
						if (item.completed === true) {
							return <Todo key={item.id} title={item.title} status={item.completed} id={item.id} />
						}
					})}
				</div>
			</div>

		</div>
	)
}