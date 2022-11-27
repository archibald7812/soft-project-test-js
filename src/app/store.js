import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { albumsSlice } from "../features/albums/albumsSlice";
import { todosSlice } from "../features/todos/todosSlice";
import { loggerMiddleware } from "./middlewares/logger";
import { photosSlice } from "../features/photos/photosSlice";
import { postsSlice } from "../features/posts/postsSlice";
import { commentsSlice } from "../features/comments/commentsSlice";
import { usersSlice } from "../features/users/usersSlice";

const rootReducer = combineReducers({
    todos: todosSlice.reducer,
    albums: albumsSlice.reducer,
    photos: photosSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
    users: usersSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([loggerMiddleware]),
})