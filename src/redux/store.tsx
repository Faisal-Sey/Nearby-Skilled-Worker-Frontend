import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import userReducer from "../redux/slices/userSlice";
import resetPasswordReducer from "../redux/slices/resetPasswordSlice";
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer
} from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
  resetPasswordData: resetPasswordReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
