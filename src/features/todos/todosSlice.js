import { createSlice } from "@reduxjs/toolkit";
import { loadingStatuses } from "../../constants/loadingStatuses/loadingStatuses";
import { addNewTodo, deleteTodo, fetchTodos } from "./actions";

const initialState = {
	todos: [],
	completedTodos: [],
	status: loadingStatuses.IDLE,
	error: null
}

export const todosSlice = createSlice({
	name: 'todos',
	initialState: initialState,
	reducers: {
		changeTodosList: (state, action) => {
			state.todos = [...action.payload.todos]
		},
		changeCompletedTodosList: (state, action) => {
			state.completedTodos = [...action.payload.completedTodos]
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = loadingStatuses.LOADING
			})
			.addCase(fetchTodos.fulfilled, (state, { payload }) => {
				state.status = loadingStatuses.SUCCESS
				if (state.todos.length) return
				state.todos = payload.filter(todo => todo.completed === false)
				state.completedTodos = payload.filter(todo => todo.completed === true)
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = loadingStatuses.FAIL
				state.error = action.error.message
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				const newTodo = {
					id: (new Date()).getTime(),
					title: action.payload.todo,
					completed: false
				}
				state.todos.push(newTodo);
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Delete could not complete')
					console.log(action.payload)
					return;
				}
				!action.payload.completed ?
					state.todos = state.todos.filter((item) => item.id !== action.payload.id) :
					state.completedTodos = state.completedTodos.filter((item) => item.id !== action.payload.id)
			})
	}
})

export const getTodoById = (state, todoId) => state.todos.todos.filter(item => item.id === todoId)

export default todosSlice.reducer;