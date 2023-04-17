import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../store/basketSlice';
import userReducer from '../store/userSlice';
import { apiBack } from '../api/apiBack';
import { apiJS } from '../api/apiJS';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
    [apiBack.reducerPath]: apiBack.reducer,
    [apiJS.reducerPath]: apiJS.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBack.middleware, apiJS.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
