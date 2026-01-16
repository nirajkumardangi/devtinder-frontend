import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import connectionReducer from "../features/connectionSlice";
import feedReducer from "../features/feedSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
    feed: feedReducer,
  },
});

export default store;
