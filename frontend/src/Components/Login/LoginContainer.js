import React, { Component, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/AuthActions";
import LoginPresenter from "./LoginPresenter";
import { validator } from "../../helpers";

function LoginContainer({ history }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    isValidEmail: false,
    isValidPassword: false
  });

  const { email, password, isValidEmail, isValidPassword } = state;

  const onChange = event => {
    const { value, name } = event.target;
    const isValid = validator(name, value);
    setState({
      ...state,
      [name]: value,
      ...isValid
    });
  };

  const dispatch = useDispatch();
  const onSubmit = async event => {
    event.preventDefault();

    if (!isValidEmail || !isValidPassword) return;

    const result = await dispatch(loginUser(email, password));
    alert(result.message);
    if(result.success) {
      return history.push("/");
    }
  };

  return (
    <LoginPresenter
      email={email}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  )
};

export default LoginContainer;
