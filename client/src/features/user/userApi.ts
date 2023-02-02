// A mock function to mimic making an async request for data

//open api for shows that could return an array of shows

import axios from "axios";
import { END_POINT } from "../../helpers/consts";

export const loginUser = async (data: any) => {
  const test_endpoint = "http://localhost:5000/api";

  console.log("endPoint", END_POINT);

  try {
    const response = await axios.post(END_POINT + "session", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
