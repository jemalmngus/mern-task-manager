// authReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    // Add any additional user-related state here
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Add any additional reducer functions here
  },
});


export default authSlice.reducer;
