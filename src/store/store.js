import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import connectionReducer from "../features/connectionSlice";
import feedReducer from "../features/feedSlice";
import requestReducer from "../features/requestSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
    feed: feedReducer,
    request: requestReducer,
  },
});

export default store;
