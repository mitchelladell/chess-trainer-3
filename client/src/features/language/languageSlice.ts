import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LanguageState = {
  value: string;
};

const initialState: LanguageState = {
  value: "ar",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      localStorage.setItem("lang", action.payload);
      return { ...state, value: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = languageSlice.actions;

export default languageSlice.reducer;
