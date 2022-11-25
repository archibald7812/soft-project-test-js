import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/todos';


const initialState = {
	todos: [],
	status: 'idle',
	error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const result = await axios.get(POSTS_URL)
	return result.data
})

export const todosSlice = createSlice({
	name: 'todos',
	initialState: initialState,
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: (new Date()).getTime(),
				title: action.payload.todo,
				completed: false
			}
			state.todos.push(newTodo);
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((item) => item.id !== action.payload.id);
		},
		completeTodo: (state, action) => {
			state.todos.map((item) => { if (item.id === action.payload.id) item.completed = true })
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchTodos.fulfilled, (state, { payload }) => {
				//console.log(1, payload)
				state.status = 'succeeded'
				// Adding date and reactions
				//const loadedTodos = action.payload
				// Add any fetched posts to the array
				state.todos = payload
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
		/* 			.addCase(addNewPost.fulfilled, (state, action) => {
						// Fix for API post IDs:
						// Creating sortedPosts & assigning the id 
						// would be not be needed if the fake API 
						// returned accurate new post IDs
						const sortedPosts = state.posts.sort((a, b) => {
							if (a.id > b.id) return 1
							if (a.id < b.id) return -1
							return 0
						})
						action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
						// End fix for fake API post IDs 
		
						action.payload.userId = Number(action.payload.userId)
						action.payload.date = new Date().toISOString();
						action.payload.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0
						}
						console.log(action.payload)
						state.posts.push(action.payload)
					})
					.addCase(updatePost.fulfilled, (state, action) => {
						if (!action.payload?.id) {
							console.log('Update could not complete')
							console.log(action.payload)
							return;
						}
						const { id } = action.payload;
						action.payload.date = new Date().toISOString();
						const posts = state.posts.filter(post => post.id !== id);
						state.posts = [...posts, action.payload];
					})
					.addCase(deletePost.fulfilled, (state, action) => {
						if (!action.payload?.id) {
							console.log('Delete could not complete')
							console.log(action.payload)
							return;
						}
						const { id } = action.payload;
						const posts = state.posts.filter(post => post.id !== id);
						state.posts = posts;
					}) */
	}

})

export const { addTodo, deleteTodo, completeTodo } = todosSlice.actions;

export default todosSlice.reducer;