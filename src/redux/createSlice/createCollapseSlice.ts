import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collupse: { level1: [], level2: [], level3: [] },
};

export const collapseSlice = createSlice({
  name: "collapse",
  initialState,

  reducers: {
    addCollupse: (state, actions) => {
      const { level, height } = actions.payload;
      if (level == 2) {
        console.log("level 2 clicked, update level1");
        state.collupse.level1.push(actions.payload);
      }
      if (level == 3) {
        console.log("level 3 clicked, update level2");
        state.collupse.level2.push(actions.payload);
      }
    },
    removeCollupse: (state, actions) => {
      const { level, height, id } = actions.payload;
      if (level == 2) {
        state.collupse.level1.map((e) => e.id).indexOf(id);
        state.collupse.level1.splice(0, 1);
        console.log(state.collupse.level1);
      }
      if (level == 3) {
        state.collupse.level2.map((e) => e.id).indexOf(id);
        state.collupse.level2.splice(0, 1);
        console.log(state.collupse.level2);
      }
    },
  },
});

// ewjrwehyjrhewjxcv cfvc
export const { addCollupse, removeCollupse } = collapseSlice.actions;
export default collapseSlice.reducer;
