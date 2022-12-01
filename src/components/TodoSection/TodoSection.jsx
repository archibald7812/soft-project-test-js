import classnames from 'classnames';
import styles from './styles.module.css'
import { Todo } from '../Todo/Todo';
import { Draggable } from 'react-beautiful-dnd';

export const TodoSection = ({ todos }) => {

	return (
		<div className={classnames(styles.root)}>
			<div className={classnames(styles.section)}>
				<div className={classnames(styles.column)}>
					{todos.map((item, index) => (
						<Draggable key={item.id} draggableId={String(item.id)} index={index}>
							{(provided) => (
								<div
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									ref={provided.innerRef}
									className={styles.todos}>
									<Todo title={item.title} id={item.id} index={index} status={item.completed} />
								</div>
							)}
						</Draggable>
					))
					}
				</div>
			</div>
		</div>
	)
}


