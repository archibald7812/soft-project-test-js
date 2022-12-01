import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { TodoSection } from '../../components/TodoSection/TodoSection';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { todosSlice } from '../../features/todos/todosSlice';

export const TodoPage = () => {

	const dispatch = useDispatch()
	const { changeTodosList, changeCompletedTodosList } = todosSlice.actions
	const todos = useSelector(state => state.todos.todos)
	const completedTodos = useSelector(state => state.todos.completedTodos)

	const handleOnDragEnd = (result) => {

		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		let droppableItem;
		const activeList = [...todos];
		const completeList = [...completedTodos];

		if (source.droppableId === 'TodoList') {
			droppableItem = activeList[source.index];
			activeList.splice(source.index, 1);
		} else {

			droppableItem = completeList[source.index];
			completeList.splice(source.index, 1);
		}

		if (destination.droppableId === 'TodoList') {
			const item = { ...droppableItem }
			item.completed = false;
			activeList.splice(destination.index, 0, item);
		} else {
			const item = { ...droppableItem }
			item.completed = true;
			completeList.splice(destination.index, 0, item);
		}

		dispatch(changeTodosList({ todos: activeList }))
		dispatch(changeCompletedTodosList({ completedTodos: completeList }))
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<div className={classnames(styles.root)}>
				<h2 className={classnames(styles.title)}>ToDo List</h2>
				<AddTodo />
				<div className={classnames(styles.section)}>
					<div>
						<h4 className={classnames(styles.title)}>Active</h4>
						<Droppable droppableId="TodoList">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<TodoSection todos={todos} />
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div>
						<h4 className={classnames(styles.title)}>Completed</h4>
						<Droppable droppableId="CompletedTodoList">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<TodoSection todos={completedTodos} />
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			</div>
		</DragDropContext>
	)
}