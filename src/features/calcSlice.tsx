import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CalcState {
  prevValue: string | null;
  nextValue: string | null;
  operator: string | null;
}

const initialState: CalcState = {
  prevValue: null,
  nextValue: '0',
  operator: null,
};

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    addNum: (state, action: PayloadAction<string>) => {
      if (state.nextValue && state.nextValue?.length >= 17) return;
      if (action.payload === '.' && state.nextValue?.includes('.')) {
        return state;
      }
      if (state.nextValue === '0' && action.payload === '0') {
        return state;
      }
      if (state.nextValue === '0' && action.payload !== '0' && action.payload !== '.') {
        state.nextValue = '';
      }
      state.nextValue += action.payload;
    },
    operation: (state, action: PayloadAction<string>) => {
      state.operator = action.payload;
      state.prevValue = `${state.nextValue}`;
      state.nextValue = '0';
    },
    calculation: (state) => {
      if (state.operator === '/' && (state.prevValue === '0' || state.nextValue === '0')) {
        state.nextValue = 'Не определено';
        return;
      }
      if (state.prevValue && state.nextValue) {
        state.nextValue = String(eval(state.prevValue + state.operator + state.nextValue));
        state.prevValue = null;
        state.operator = null;
      }
    },
    reset: (state) => {
      state.nextValue = '0';
    },
  },
});

export const { addNum, operation, calculation, reset } = calcSlice.actions;

export default calcSlice.reducer;
