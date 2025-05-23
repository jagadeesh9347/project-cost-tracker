// src/features/items/itemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
