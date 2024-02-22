// userApi.js
import { mySupabase } from "../../mysuba";;

export const loginUser = async (loginData : any) => {
  try {
    let { data, error } = await mySupabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
   return error
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await mySupabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return null; // You might not need to return anything after a successful logout
  } catch (error) {
    return error
  }
};
