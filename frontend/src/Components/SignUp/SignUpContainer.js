import React, { Component } from "react";
import SignUpPresenter from "./SignUpPresenter";
import { signUpUser } from "../../actions";
import {
  emailValidator,
  passwordValidator,
  nameValidator
} from "../../helpers";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      isNameValidation: false,
      isEmailValidation: false,
      isPasswordValidation: false
    };
  }
  onChange = event => {
    const {
      target: { id, value }
    } = event;
    switch (id) {
      case "name":
        const isNameValidation = nameValidator(value);
        this.setState({ 
          name: value, 
          isNameValidation: isNameValidation 
        });
        break;
      case "email":
        const isEmailValidation = emailValidator(value);
        this.setState({ 
          email: value, 
          isEmailValidation: isEmailValidation 
        });
        break;
      case "password":
        const isPasswordValidation = passwordValidator(value);
        this.setState({
          password: value,
          isPasswordValidation: isPasswordValidation
        });
        break;
      default:
        break;
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    const { name, email, password, isNameValidation, isEmailValidation, isPasswordValidation } = this.state;

    if(!isNameValidation || !isEmailValidation || !isPasswordValidation) 
      return;

    const result = await signUpUser(name, email, password);
    alert(result.message);
    if(result.success) {
      return this.props.history.push("/");
    }
  };

  render() {
    const {
      name,
      email,
      password,
      isEmailValidation,
      isPasswordValidation,
      isNameValidation
    } = this.state;
    return (
      <SignUpPresenter
        name={name}
        email={email}
        password={password}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isNameValidation={isNameValidation}
        isEmailValidation={isEmailValidation}
        isPasswordValidation={isPasswordValidation}
      />
    );
  }
}

export default SignUpContainer;
