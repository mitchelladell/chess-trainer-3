import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./userApi";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

interface IDecodedResponse {
  [key: string]: any;
}

export interface UserState {
  value: any;
  userInfo: any;
  status: "idle" | "loading" | "failed";
  errors: any;
  userLoggedIn: boolean;
}

interface IloginData {
  email: string;
  password: string;
}

interface IUserData {
  [key: string]: string | number;
}

const initialState: UserState = {
  value: {},
  userInfo: {},
  status: "idle",
  errors: "",
  userLoggedIn: Cookies.get("token") ? true : false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (data: IloginData) => {
    return loginUser(data); //return value of the api call gets assigned to user value
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        console.log("hello");
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload; //Here how the value of the state gets modified to be the payload of the action
        console.log("acttionPayload", action.payload);
        let token = Cookies.get("token");
        console.log("token", token);

        let decodedResponse: IDecodedResponse = token ? jwt_decode(token) : {};
        console.log("decodedResponse", decodedResponse);
        state.userInfo = decodedResponse;
        state.userLoggedIn = token ? true : false;
        console.log("userInfo", state.userInfo);

        /*   patchUserDataAsync({ locale: 'nl' }, state.userInfo.id).then(
          (response) => console.log('response', response)
        ); */
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default userSlice.reducer;
