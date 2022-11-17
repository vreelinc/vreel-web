import { createSlice } from "@reduxjs/toolkit";

export const sectionsSlice = createSlice({
  name: "vreel",
  initialState: {
    vreel: null,
    duration: 0,
    metadata: {
      employee: null,
      username: null
    }
  },
  reducers: {
    setVreel: (state, actions) => {
      state.vreel = actions.payload;
    },
    setVreelMetadata: (state, actions) => {
      console.log("setting data =>", actions.payload)
      state.metadata = actions.payload;
    },
    getDuration: (state, actions) => {
      state.duration = actions.payload
    }
  },
});

export const { setVreel, getDuration, setVreelMetadata } = sectionsSlice.actions;
export default sectionsSlice.reducer;
