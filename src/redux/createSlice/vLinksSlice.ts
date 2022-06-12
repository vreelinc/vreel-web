import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  vLinksModalInit : false,
  id:0,
}

export const vLinksActions = createSlice({
  name: 'vLinks',
  initialState,
  reducers: {
    expandVLinks: (state) =>{
      state.vLinksModalInit = !state.vLinksModalInit;
    },
    getIdActions:(state,actions)=>{
        state.id = actions.payload;
    }
  }
})


export const {expandVLinks,getIdActions} = vLinksActions.actions;
export default vLinksActions.reducer;