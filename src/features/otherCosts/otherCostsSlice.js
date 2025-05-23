// src/features/otherCosts/otherCostsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otherCosts: [],
};

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState,
  reducers: {
    setOtherCosts: (state, action) => {
      state.otherCosts = action.payload;
    },
    addOtherCost: (state, action) => {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost: (state, action) => {
      const index = state.otherCosts.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) {
        state.otherCosts[index] = action.payload;
      }
    },
    deleteOtherCost: (state, action) => {
      state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
    },
  },
});

export const { setOtherCosts, addOtherCost, updateOtherCost, deleteOtherCost } = otherCostsSlice.actions;

export default otherCostsSlice.reducer;