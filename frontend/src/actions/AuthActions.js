import { api } from "../api";
import { SET_LOGIN_USER, SIGNUP_USER } from "./types";

export const loginUser = (email, password) => {
  return dispatch => {
    api.post("api/auth/login", {
      email,
      password
    }).then(res => {
      const { data } = res;
      dispatch(setLoginUser(data));
    });
  }
}

const setLoginUser = ({ id, name, email, jwtToken }) => {
  return {
    type: SET_LOGIN_USER,
    id,
    name,
    email,
    jwtToken
  }
};

export const signUpUser = async (name, email, password) => {
  return await api.post("api/auth/register", {
    name,
    email,
    password
  })
};