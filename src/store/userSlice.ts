import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  type: string | null;
  email: string | null;
  token: string | null;
  isActive: boolean;
}

const initialState: UserState = {
  id: null,
  type: "",
  email: null,
  token: null,
  isActive: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isActive = action.payload.isActive;
    },
    clearUser: (state) => {
      state.id = null;
      state.type = null;
      state.email = null;
      state.token = null;
      state.isActive = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
