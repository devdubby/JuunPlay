import React, { Component } from "react";
import LoginPresenter from "./LoginPresenter";
import { loginUser } from "../../actions";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
  }

  onChange = (event) => {
    const { target: { id, value } } = event;
    switch(id) {
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
    const { email, password } = this.state;
    await loginUser(email, password);
    return this.props.history.push("/home");
  };

  render() {
    return (
      <LoginPresenter onChange={this.onChange} onSubmit={this.onSubmit} />
    )
  }
}

export default LoginContainer;