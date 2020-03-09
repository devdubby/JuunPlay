import React, { Component, useState } from "react";
import SignUpPresenter from "./SignUpPresenter";
import { signUpUser } from "../../actions";
import { validator } from "../../helpers";

function SignUpContainer({ history }) {
  const [state, setState] = useState({
    name: null,
    email: null,
    password: null,
    isValidName: false,
    isValidEmail: false,
    isValidPassword: false
  });

  const { name, email, password, isValidName, isValidEmail, isValidPassword } = state;

  const onChange = event => {
    const { name, value } = event.target;
    const isValid = validator(name, value);
    setState({
      ...state,
      [name]: value,
      ...isValid
    });
  };

  const onSubmit = async event => {
    event.preventDefault();

    if(!isValidName || !isValidEmail || !isValidPassword) 
      return;

    const result = await signUpUser(name, email, password);
    alert(result.message);
    if(result.success) {
      return history.push("/");
    };
  };

  return (
    <SignUpPresenter
      name={name}
      email={email}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      isValidName={isValidName}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
}

export default SignUpContainer;
