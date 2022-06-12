import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createHeightSlice from "../createSlice/createHeightSlice";
import createMenuSlice from "../createSlice/createMenuSlice";
import createMobileMediaSelector from "../createSlice/createMobileMediaSelector";
import HeroBannerSlice from "../createSlice/HeroBannerSlice";
import userAuthSlice from "../createSlice/userSlice";
import createCollapseSlice from "../createSlice/createCollapseSlice";
import bottomSheetSlice from "../createSlice/bottomSheetSlice";

export const store = configureStore({
  reducer: {
    collapse: createCollapseSlice,
    expandMenu: createMenuSlice,
    mobileMediaSelector: createMobileMediaSelector,
    nestedHeight: createHeightSlice,
    heroBannerSlice: HeroBannerSlice,
    userAuth: userAuthSlice,
    bottomSheet: bottomSheetSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
