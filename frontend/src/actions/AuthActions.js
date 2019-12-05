import { api } from "../api";
import { SET_LOGIN_USER } from "./types";

export const loginUser = (email, password) => {
  return dispatch => {
    return api.post("api/auth/login", {
      email,
      password
    })
    .then(res => {
      dispatch(setLoginUser(res.data));
      return res.data;
    })
    .catch(err => err.response.data);
  }
}

const setLoginUser = ({ id, name, email, jwtToken }) => {
  localStorage.setItem("jwtToken", jwtToken);
  return {
    type: SET_LOGIN_USER,
    id,
    name,
    email,
    jwtToken
  }
};

export const signUpUser = (name, email, password) => (
  api.post("api/auth/register", {
    name,
    email,
    password
  })
  .then(res => res.data)
  .catch(err => err.response.data)
);

export const checkLoginUser = jwtToken => {
  return dispatch => {
    return api.get("api/auth/check", {
      headers: {
        'x-access-token': jwtToken
      }
    })
    .then(res => {
      dispatch(setLoginUser({...res.data.info, jwtToken}));
      return res.data;
    })
    .catch(err => err.response.data);
  }
};