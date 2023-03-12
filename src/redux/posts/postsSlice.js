// Add your code here to create a new posts slice, use counter slice as a reference for creating the slice and the actions that go with it.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { toFormData } from 'axios';


const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    message: '',
}

const baseURL = 'https://jsonplaceholder.typicode.com/posts'
// Get posts starts here ---------------------------------
export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts', async (_, thunkAPI) => {
        // console.log(thunkAPI.getState());
        const response = await axios.get(baseURL);
        console.log(response);
        const data = await response.data;
        return data
    }
)
// Get posts finishes here ---------------------------------
// Delete starts here ------------------
export const deletePost = createAsyncThunk(
    'posts/deletePost', async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`)
        const data = await response.data
        return id
    }
)
// Delete finishes here ------------------
// Update starts here ------------------
export const updatePost = createAsyncThunk(
    'posts/updatePost', async (update) => {
        const response = await axios.put(`${baseURL}/${update.newPost.id}`, update.newPost)
        const data = await response.data
        return data
    }
)

// Update finishes here ------------------
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // reducers: {
    //     search: (state, action) => { },
    // },
    extraReducers: (builder) => {
        // Get posts addCase starts here ---------------------------------
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.isLoading = false
            state.message = 'Fetch Successful'
        })
        builder.addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = 'Fetch failed'
            state.posts = []
        })
        // Get posts addCase finishes here ---------------------------------
        // Delete addCase starts here ---------------------------------
        builder.addCase(deletePost.fulfilled, (state, action) => {
            let id = action.payload
            state.posts = state.posts.filter((post) => post.id !== id)
            state.isLoading = false
            state.message = 'Delete successful'
        })
        builder.addCase(deletePost.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = 'Delete failed'
        })
        // Update addCase starts here ---------------------------------
        builder.addCase(updatePost.fulfilled, (state, action) => {
            let updated = action.payload
            state.posts = state.posts.map((post) => {
                if (post.id === updated.id) {
                    return updated
                }
                return post
            })
            state.isLoading = false
            state.message = 'Update successful'
        })
        // Update addCase finishes here ---------------------------------
    }
})

// export const { search } = postsSlice.actions
export const selectPosts = (state) => state.posts

export default postsSlice.reducer