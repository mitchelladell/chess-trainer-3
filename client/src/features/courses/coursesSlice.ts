import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



const initialState: any = {
  subscribedCourses: [],
  status: "idle",
  errors: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateCoursesList: (state, action: PayloadAction<any>) => {
      // Update user information locally
      //state.userInfo = { ...state.userInfo, ...action.payload };
      state.subscribedCourses = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { updateCoursesList } = coursesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default coursesSlice.reducer;
