import { api } from "../api";
import { LOGIN_USER, SIGNUP_USER } from "./types";

export const loginUser = async (email, password) => {
  api.post("api/auth/login", {
    email,
    password
  }).then(res => {
    const { data: { id, name, email, jwtToken } } = res;
    console.log('data', res.data);
    return {
      type: LOGIN_USER,
      id: id,
      name: name,
      email: email,
      jwtToken: jwtToken,
    }
  })
};

export const signUpUser = async (name, email, password) => {
  return await api.post("api/auth/register", {
    name,
    email,
    password
  })
};