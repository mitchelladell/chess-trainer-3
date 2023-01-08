import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PgnState = {
  value: any;
};

const initialState: PgnState = {
  value: [],
};

export const pgnSlice = createSlice({
  name: "pgn",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value = action.payload;

      console.log("payload", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = pgnSlice.actions;

export default pgnSlice.reducer;
