import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import bottomSheetSlice from '@redux/createSlice/bottomSheetSlice';
import createCollapseSlice from '@redux/createSlice/createCollapseSlice';
import createHeightSlice from '@redux/createSlice/createHeightSlice';
import createMenuSlice from '@redux/createSlice/createMenuSlice';
import createMobileMediaSelector from '@redux/createSlice/createMobileMediaSelector';
import HeroBannerSlice from '@redux/createSlice/HeroBannerSlice';
import userAuthSlice from '@redux/createSlice/userSlice';

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
