import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './../redux/counter/counterSlice'
import postsReducer from './../redux/posts/postsSlice'

export const store = configureStore({
  // We can add as many reducers as we want here, and they will be combined into a single state object.
  reducer: {
    counter: counterReducer,
    postsR: postsReducer
  },
})
