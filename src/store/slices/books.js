import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://6666aa6ba2f8516ff7a44d13.mockapi.io/blum/api/v1/books";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

export const getBooks = createAsyncThunk("books/getBooks", async () => {
    const response = await axios.get(API_URL);

    if (response.status !== 200) {
        throw new Error("Error to fetching data");
    }

    return response.data;
});
    
export const getBookById = createAsyncThunk("books/getBookById", async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);

    if (response.status !== 200) {
        throw new Error("Error to fetching data");
    }

    return response.data;
})

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        //getBooks
        builder.addCase(getBooks.pending, (state) => {
            state.loading  = true;
        });
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.list = action.payload;

            state.loading = false;
            state.error = null;
        });
        builder.addCase(getBooks.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        //getBooksById
        builder.addCase(getBookById.pending, (state) => {
            state.loading  = true;
        });
        builder.addCase(getBookById.fulfilled, (state, action) => {
            state.list = action.payload;

            state.loading = false;
            state.error = null;
        });
        builder.addCase(getBookById.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    },
});

export default booksSlice.reducer;
