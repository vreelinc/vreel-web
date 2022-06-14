import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  vLinksModalInit : false,
  eventsModalInit:false,
  bottomSheetInit:false,
  findItem:{id:0,type:''},
}

export const vLinksActions = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    expandVLinks: (state) =>{
      state.vLinksModalInit = !state.vLinksModalInit;
    },
    expandEventsModal:(state)=>{
      state.eventsModalInit = !state.eventsModalInit;
    },
    getIdActions:(state,actions)=>{
        state.findItem = actions.payload;
    },
    openBottomSheet:(state,actions)=>{
      state.bottomSheetInit = actions.payload;
    }
  }
})


export const {expandVLinks,getIdActions,openBottomSheet,expandEventsModal} = vLinksActions.actions;
export default vLinksActions.reducer;