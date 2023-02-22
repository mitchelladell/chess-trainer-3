import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = {
  value: string;
};

const initialState: ThemeState = {
  value: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<string>) => {
      localStorage.setItem("theme", action.payload);
      return { ...state, value: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
