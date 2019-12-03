import { SIGNUP_USER, SET_LOGIN_USER } from "../actions/types";
import { api } from "../api";

const initialState = {
  id: '',
  name: '',
  email: '',
  jwtToken: '',
}

export default (state = initialState, action) => {
  console.log('action check:' ,action)
  switch(action.type) {
    case SET_LOGIN_USER:
      return {
        ...state,
        id: action.id,
        name: action.name,
        email: action.email,
        jwtToken: action.jwtToken
      }
    case SIGNUP_USER:
      return {
        ...state
      }
    default:
      return state;
  }
};