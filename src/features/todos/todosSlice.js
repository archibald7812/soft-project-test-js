import { createSlice } from "@reduxjs/toolkit";
import todos from "../../constants/data/todos";

export const todosSlice = createSlice({
	name: 'todos',
	initialState: todos,
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: (new Date()).getTime(),
				title: action.payload.todo,
				completed: false
			}
			state.push(newTodo);
		},
		deleteTodo: (state, action) => {
			return state.filter((item) => item.id !== action.payload.id);
		},
		completeTodo: (state, action) => {
			state.map((item) => { if (item.id === action.payload.id) item.completed = true })
		}
	}

})

export const { addTodo, deleteTodo, completeTodo } = todosSlice.actions;

export default todosSlice.reducer;