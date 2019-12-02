import { LOGIN_USER, SIGNUP_USER } from "../actions/types";

const initialState = {
  id: '',
  name: '',
  email: '',
  jwtToken: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_USER:
      console.log('login user type', state, action)
      return {
        ...state,
      }
    case SIGNUP_USER:
      return {
        ...state
      }
    default:
      return state;
  }
};