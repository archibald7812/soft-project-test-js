import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { albumsSlice } from "../features/albums/albumsSlice";
import { todosSlice } from "../features/todos/todosSlice";
import { loggerMiddleware } from "./middlewares/logger";
import { photosSlice } from "../features/photos/photosSlice";

const rootReducer = combineReducers({
    todos: todosSlice.reducer,
    albums: albumsSlice.reducer,
    photos: photosSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([loggerMiddleware]),
})