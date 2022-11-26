import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../../features/todos/todosSlice';
import styles from './styles.module.css'

export const AddTodo = () => {
	const [value, setValue] = useState('')

	const dispatch = useDispatch()

	const onSubmit = (event) => {
		event.preventDefault();

		if (value.trim().length === 0) {
			alert("Enter a task before adding !!");
			setValue("");
			return;
		}

		dispatch(
			addNewTodo({
				todo: value
			})
		);

		setValue("");
	};


	return (
		<div className={classnames(styles.input)}>
			<input
				type='text'
				placeholder='Add task...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>
			<button onClick={onSubmit}>Add</button>
		</div>
	)
}