import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignUpPresenter from "./SignUpPresenter";
import { signUpUser } from "../../actions";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
    }
  }
  onChange = (event) => {
    const { target: { id, value } } = event;
    switch(id) {
      case "name":
        this.setState({ name: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "password": 
        this.setState({ password: value });
        break;
      default:
        break;
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    await signUpUser(name, email, password);
    return this.props.history.push("/");
  }

  render() {
    return (
      <SignUpPresenter onChange={this.onChange} onSubmit={this.onSubmit} />
    )
  }
}

export default SignUpContainer;