import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LanguageReducer from "../features/language/languageSlice";
import pgnSlice from "../features/pgns/pgnSlice";
import themeSlice from "../features/Theme/themeSlice";
import userSlice from "../features/user/userSlice";
import coursesSlice from "../features/courses/coursesSlice";

export const store = configureStore({
  reducer: {
    language: LanguageReducer,
    pgn: pgnSlice,
    user: userSlice,
    courses: coursesSlice,
    theme: themeSlice,
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
