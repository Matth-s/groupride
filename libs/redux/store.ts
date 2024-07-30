import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './features/modal-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
