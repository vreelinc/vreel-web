import { createSlice } from "@reduxjs/toolkit";

export const sectionsSlice = createSlice({
  name: "vreel",
  initialState: { vreel: null,duration:0 },
  reducers: {
    setVreel: (state, actions) => {
      state.vreel = actions.payload;
    },
    getDuration:(state,actions)=>{
      state.duration = actions.payload
    }
  },
});

export const { setVreel,getDuration } = sectionsSlice.actions;
export default sectionsSlice.reducer;
