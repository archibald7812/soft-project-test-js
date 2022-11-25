import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "../features/todos/todosSlice";
import { loggerMiddleware } from "./middlewares/logger";


const rootReducer = combineReducers({
    todos: todosSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([loggerMiddleware]),
})