import { configureStore } from '@reduxjs/toolkit';
import calcSlice from '../features/calcSlice';
import constructSlice from '../features/constructSlice';

export const store = configureStore({
  reducer: {
    construct: constructSlice,
    calc: calcSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
