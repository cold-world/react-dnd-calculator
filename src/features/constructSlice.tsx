import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export type BlockType = 'numbers' | 'operators' | 'display' | 'calculate';

export interface IBlockItem {
  id: string;
  blockType: BlockType;
  isOnCanvas: boolean;
}

interface AddToCanvasPayload {
  block: IBlockItem;
  position: number;
}

export interface ConstructState {
  sidebarList: IBlockItem[];
  canvasList: IBlockItem[];
  isRuntime: boolean;
}

const initialState: ConstructState = {
  sidebarList: [
    {
      id: v4(),
      blockType: 'display',
      isOnCanvas: false,
    },
    {
      id: v4(),
      blockType: 'operators',
      isOnCanvas: false,
    },
    {
      id: v4(),
      blockType: 'numbers',
      isOnCanvas: false,
    },
    {
      id: v4(),
      blockType: 'calculate',
      isOnCanvas: false,
    },
  ],
  canvasList: [],
  isRuntime: false,
};

export const constructSlice = createSlice({
  name: 'construct',
  initialState,
  reducers: {
    addToCanvas: (state, action: PayloadAction<AddToCanvasPayload>) => {
      const { block, position } = action.payload;
      const updBlock = { ...block, isOnCanvas: true };
      if (updBlock.blockType === 'display') {
        state.canvasList.unshift(updBlock);
      } else if (position >= 0 && position < state.canvasList.length) {
        state.canvasList.splice(position, 0, updBlock);
      } else {
        state.canvasList.push(updBlock);
      }
      const index = state.sidebarList.findIndex((i) => i.id === block.id);
      if (index !== -1) {
        state.sidebarList[index].isOnCanvas = true;
      }
    },
    deleteFromCanvas: (state, action: PayloadAction<IBlockItem>) => {
      const block = action.payload;
      state.canvasList = state.canvasList.filter((item) => item.blockType !== block.blockType);
      const index = state.sidebarList.findIndex((i) => i.id === block.id);
      if (index !== -1) {
        state.sidebarList[index].isOnCanvas = false;
      }
    },
    toggleRuntime: (state, action: PayloadAction<boolean>) => {
      state.isRuntime = action.payload;
    },
    
  },
});

export const { addToCanvas, deleteFromCanvas, toggleRuntime } = constructSlice.actions;
export default constructSlice.reducer;
