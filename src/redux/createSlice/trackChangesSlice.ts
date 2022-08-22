import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  slides: {},
  user: null,
};

export const trackChangesSlice = createSlice({
  name: "trackChanges",
  initialState,
  reducers: {
    trackSlide: (state, action) => {
      state.slides[action.payload.slide.id] = action.payload.slide;
    },
    unTrackSlide: (state, action) => {
      console.log(action.payload);

      delete state.slides[action.payload];
    },
  },
});

export const { trackSlide, unTrackSlide } = trackChangesSlice.actions;
export default trackChangesSlice.reducer;
