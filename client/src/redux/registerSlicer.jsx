import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:9000/api"

export const register = createAsyncThunk("register", async ({ username, password, role }) => {
  console.log(username, password, role)
  await axios.post(
    `${baseURL}/auth/register`,
    JSON.stringify({ username, password, role }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
  .then((res) => {
    toast.success(res.data.message)
  })
  .catch((err) => {
    toast.error(err.response.data.message)
  });
})

const registerSlice = createSlice({
  name: 'register',
  initialState: { 
    isLoading: false,
    data: {},
    error: false
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = true
    })
  }
});

export default registerSlice.reducer;