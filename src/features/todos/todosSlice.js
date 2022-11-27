import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


const initialState = {
	todos: [],
	status: 'idle',
	error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const result = await axios.get(TODOS_URL)
	return result.data
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (initialTodo) => {
	const result = await axios.post(TODOS_URL, initialTodo)
	return result.data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (initialTodo) => {
	const { id } = initialTodo;
	try {
		const response = await axios.delete(`${TODOS_URL}/${id}`)
		if (response?.status === 200) return initialTodo;
		return `${response?.status}: ${response?.statusText}`;
	} catch (err) {
		return err.message;
	}
})

export const completeTodo = createAsyncThunk('todos/completeTodo', async (initialTodo) => {
	const { id } = initialTodo;
	const result = await axios.patch(`${TODOS_URL}/${id}`)
	return result.data
})

export const todosSlice = createSlice({
	name: 'todos',
	initialState: initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchTodos.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'

				state.todos = payload
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed'
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
			.addCase(completeTodo.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Update could not complete')
					console.log(action.payload)
					return;
				}
				state.todos.map((item) => { if (item.id === action.payload.id) item.completed = true })
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Delete could not complete')
					console.log(action.payload)
					return;
				}
				state.todos = state.todos.filter((item) => item.id !== action.payload.id);
			})
	}
})

export const getTodoById = (state, todoId) => state.todos.todos.filter(item => item.id === todoId)

export default todosSlice.reducer;