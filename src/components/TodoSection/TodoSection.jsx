import classnames from 'classnames';
import styles from './styles.module.css'
import { Todo } from '../Todo/Todo';
import { useSelector } from "react-redux";

export const TodoSection = ({ actionStatus }) => {

	const todos = useSelector((state) => {
		return state.todos;
	});

	return (
		<div className={classnames(styles.root)}>
			<h3 className={classnames(styles.title)}>{actionStatus ? "Completed" : "Active"}</h3>
			<div className={classnames(styles.section)}>
				{todos.filter(item => item.completed === actionStatus).map(item => {
					return <Todo key={item.id} title={item.title} status={actionStatus} id={item.id} />
				})}
			</div>
		</div>
	)
}