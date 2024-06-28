import { configureStore } from "@reduxjs/toolkit";
import books from './slices/books';


export const store = configureStore({
    reducer: {
        books,
    }
})