import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';
import './index.css';
import { fetchPosts } from './features/posts/postsSlice';
import { fetchTodos } from './features/todos/todosSlice';
import { fetchAlbums } from './features/albums/albumsSlice';
import { fetchComments } from './features/comments/commentsSlice';
import { fetchUsers } from './features/users/usersSlice';

const container = document.getElementById('root');
const root = createRoot(container);

//store.dispatch(fetchPosts());
store.dispatch(fetchTodos());
store.dispatch(fetchAlbums());
store.dispatch(fetchTodos());
store.dispatch(fetchComments())
store.dispatch(fetchUsers())

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

