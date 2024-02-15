import { configureStore } from "@reduxjs/toolkit";
import baseQuery from "./api/baseApi";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    [baseQuery.reducerPath]: baseQuery.reducer,
    auth: authSlice,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
