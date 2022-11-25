import classnames from 'classnames';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { TodoSection } from '../../components/TodoSection/TodoSection';
import styles from './styles.module.css'

export const TodoPage = () => {
	return (
		<div className={classnames(styles.root)}>
			<h2 className={classnames(styles.title)}>ToDo List</h2>
			<AddTodo />
			<div className={classnames(styles.section)}>
				<TodoSection actionStatus={false} />
				<TodoSection actionStatus={true} />
			</div>
		</div>
	)
}