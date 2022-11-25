import classnames from 'classnames';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { TodoSection } from '../../components/TodoSection/TodoSection';

import styles from './styles.module.css'

export const TodoPage = () => {

	return (
		<div className={classnames(styles.root)}>
			<h2 className={classnames(styles.title)}>ToDo List</h2>
			<AddTodo />
			<div>
				<TodoSection />
			</div>
		</div>
	)
}