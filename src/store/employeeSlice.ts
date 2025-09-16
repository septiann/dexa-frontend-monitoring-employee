import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  id: string | null;
  positionId: string | null;
  photoUrl: string | null;
  authUserId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  nik: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  status: string | null;
}

const initialState: EmployeeState = {
  id: null,
  positionId: null,
  photoUrl: null,
  authUserId: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  nik: null,
  name: null,
  phone: null,
  email: null,
  status: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<EmployeeState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.positionId = action.payload.positionId;
      state.photoUrl = action.payload.photoUrl;
      state.authUserId = action.payload.authUserId;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.deletedAt = action.payload.deletedAt;
      state.nik = action.payload.nik;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.status = action.payload.status;
    },
    clearEmployee: (state) => {
      state.id = null;
      state.email = null;
      state.positionId = null;
      state.photoUrl = null;
      state.authUserId = null;
      state.createdAt = null;
      state.updatedAt = null;
      state.deletedAt = null;
      state.nik = null;
      state.name = null;
      state.phone = null;
      state.email = null;
      state.status = null;
    },
  },
});

export const { setEmployee, clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
