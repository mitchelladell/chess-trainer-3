import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LanguageState = {
  value: string,
};

const initialState: LanguageState = {
  value: "ar",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      localStorage.setItem("lang", action.payload);

      state.value = action.payload;

      console.log("payload", action.payload);
    },
  
  },
});

// Action creators are generated for each case reducer function
export const { update } = languageSlice.actions;

export default languageSlice.reducer;
