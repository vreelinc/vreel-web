import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userAuthenticated : false
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userAuthReducer: (state , action) =>{
      state.userAuthenticated = action.payload
    }
  }
})


export const {userAuthReducer} = userAuthSlice.actions;
export default userAuthSlice.reducer;