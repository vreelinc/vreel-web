import { createSlice } from "@reduxjs/toolkit";

export const sectionsSlice = createSlice({
  name: "vreel",
  initialState: { vreel: null },
  reducers: {
    setVreel: (state, actions) => {
      state.vreel = actions.payload;
    },
  },
});

export const { setVreel } = sectionsSlice.actions;
export default sectionsSlice.reducer;
