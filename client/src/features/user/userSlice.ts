import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./userApi";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export interface IDecodedResponse {
  [key: string]: any;
}

interface SuperbaseResponse {
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
  async (data: IloginData ) => {
    try {
      const response = await loginUser(data); // Call API to log in
      console.log('response', response)
      return response; // Return the response if login is successful
    } catch (error) {
      // Reject with a custom error message
      return error
    }
  }
);





export const logoutAsync = createAsyncThunk("user/logoutUser", async () => {
  return logoutUser(); //return value of the api call gets assigned to user value
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<IUserData>) => {
      // Update user information locally
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const superbaseResponse = action.payload as SuperbaseResponse;

        console.log('supaBase Response', action.payload)

        const accessToken = superbaseResponse.session?.access_token;

        if (accessToken) {
          const decodedResponse: IDecodedResponse = jwt_decode(accessToken);
          state.userInfo = decodedResponse;
          state.userLoggedIn = true;
          state.errors = null;
          Cookies.set("token", accessToken);
        }
        else {
          // If no accessToken, handle this as an error or invalid response
          state.errors = "Login failed.";  // Set a relevant error message
        }
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = 'Login Failed';

      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";

        Cookies.remove("token");
        state.userLoggedIn = false;
        state.userInfo = {};
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      });
  },
});

export const { updateUserInfo } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default userSlice.reducer;
