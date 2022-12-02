import { createAsyncThunk } from "@reduxjs/toolkit"
import { loadingApi } from "../../api/axios/axios";
import { store } from "../../app/store";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {

	const { todos } = store.getState().todos

	if (todos.length) return

	const result = await loadingApi.get('/todos')
	return result.data
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (initialTodo) => {

	const result = await loadingApi.post('/todos', JSON.stringify(initialTodo))

	return result.data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (initialTodo) => {
	const { id } = initialTodo;
	try {
		const response = await loadingApi.delete(`/todos/${id}`)
		if (response?.status === 200) return initialTodo;
		return `${response?.status}: ${response?.statusText}`;
	} catch (err) {
		return err.message;
	}
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ initialTodo }) => {
	const { id } = initialTodo;

	const result = await loadingApi.patch(`/todos/${id}`, JSON.stringify(initialTodo))

	return result.data
})