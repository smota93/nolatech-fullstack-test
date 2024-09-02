import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const baseURL = "http://localhost:9000/api"

export const login = createAsyncThunk("login", async ({ username, password }) => {
  await axios.post(
    `${baseURL}/auth/login`,
    JSON.stringify({ username, password }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
  .then((res) => {
    console.log(res.data)
  })
  .catch((err) => {
    console.log(err.response)
  });
})

const loginSlice = createSlice({
  name: 'login',
  initialState: { 
    isLoading: false,
    data: {},
    error: false
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = true
    })
  }
});

export default loginSlice.reducer;