import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../../features/todos/actions';
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
		<div className={classnames(styles.root)}>
			<input
				className={classnames(styles.input)}
				type='text'
				placeholder='Add task...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>
			<button
				className={classnames(styles.button)}
				onClick={onSubmit}>Add
			</button>
		</div>
	)
}