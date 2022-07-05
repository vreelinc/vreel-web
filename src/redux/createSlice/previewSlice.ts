import { createSlice } from "@reduxjs/toolkit";

const initialState:any={
    previewObj:[],
    activeIndex:0,
}
export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewObj:(state,actions)=>{
        state.previewObj.push(actions.payload);
    },
    setActiveIndex:(state,actions)=>{
        state.activeIndex = actions.payload;
    }
  },
});

export const {setPreviewObj,setActiveIndex } = previewSlice.actions;
export default previewSlice.reducer;
