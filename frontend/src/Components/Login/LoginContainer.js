import React, { Component } from "react";
import LoginPresenter from "./LoginPresenter";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
import { emailValidator, passwordValidator } from "../../helpers";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isEmailValidation: false,
      isPasswordValidation: false
    };
  }

  onChange = event => {
    const {
      target: { id, value }
    } = event;
    switch (id) {
      case "email":
        const isEmailValidation = emailValidator(value);
        this.setState({ email: value, isEmailValidation: isEmailValidation });
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
    const {
      email,
      password,
      isEmailValidation,
      isPasswordValidation
    } = this.state;
    const { loginUser } = this.props;

    if (!isEmailValidation || !isPasswordValidation) return;

    const result = await loginUser(email, password);
    alert(result.message);
    if(result.success) {
      return this.props.history.push("/home");
    }
  };

  render() {
    const {
      email,
      password,
      isEmailValidation,
      isPasswordValidation
    } = this.state;
    return (
      <LoginPresenter
        email={email}
        password={password}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isEmailValidation={isEmailValidation}
        isPasswordValidation={isPasswordValidation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  loginUser
})(LoginContainer);
