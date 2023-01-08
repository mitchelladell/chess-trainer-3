import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LanguageReducer from "../features/language/languageSlice";
import pgnSlice from "../features/pgns/pgnSlice";

export const store = configureStore({
  reducer: {
    language: LanguageReducer,
    pgn: pgnSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
