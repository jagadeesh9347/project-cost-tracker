// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';
import otherCostsReducer from '../features/otherCosts/otherCostsSlice'; // <--- NEW IMPORT

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    otherCosts: otherCostsReducer, // <--- NEW REDUCER
  },
});

export default store;