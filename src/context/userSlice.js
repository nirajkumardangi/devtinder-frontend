import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, checked: false },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.checked = true;
    },
    setChecked: (state) => {
      state.checked = true;
    },
    removeUser: (state) => {
      state.data = null;
      state.checked = true;
    },
  },
});

export const { addUser, removeUser, setChecked } = userSlice.actions;

export default userSlice.reducer;
