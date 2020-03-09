import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    background-image: url("https://image.tmdb.org/t/p/original/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    position: absolute;
    opacity: 0.3 !important;
    z-index: -1;
    content: "";
    width: 100%;
    height: 100vh;
  }
`;

const SubmitForm = styled.form`
  width: 36vw;
  height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 10vh;
`;

const InputContainer = styled.div``;

const Input = styled.input`
  width: 18vw;
  height: 7vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 14px;
  margin-bottom: 1vh;
  font-size: 18px;
  padding: 0px 15px;
`;

const Button = styled.button`
  z-index: 1;
  color: white;
  background-color: rgba(119, 185, 255, 0.5);
  font-size: 22px;
  margin-top: 3em;
  padding: 0.25em 1em;
  border: 0.4px solid white;
  border-radius: 25px;
  width: 20vw;
  height: 6.5vh;
  position: relative;
  cursor: pointer;
  opacity: ${props => (props.isValidName && props.isValidEmail && props.isValidPassword ? null : 0.3)};
  outline: none;
`;

const NameValiIcon = styled.i`
  font-size: 23px;
  position: absolute;
  top: 40.6vh;
  right: 41.5vw;
  color: ${props => (props.isValidName ? "#80d4ff" : "#f92554")};
`;

const EmailValiIcon = styled.i`
  font-size: 23px;
  position: absolute;
  top: 48.5vh;
  right: 41.5vw;
  color: ${props => (props.isValidEmail ? "#80d4ff" : "#f92554")};
`;

const PasswordValiIcon = styled.i`
  font-size: 23px;
  position: absolute;
  top: 56.3vh;
  right: 41.5vw;
  color: ${props => (props.isValidPassword ? "#80d4ff" : "#f92554")};
`;

const SignUpPresenter = ({
  name,
  email,
  password,
  onChange,
  onSubmit,
  isValidEmail,
  isValidPassword,
  isValidName
}) => (
  <Container>
    <SubmitForm onSubmit={onSubmit}>
      <Title>JuunPlay</Title>
      <InputContainer>
        <Input
          type="text"
          name="name"
          placeholder="Name(2자 이상)"
          onChange={onChange}
          maxLength="20"
        />
        {name && name.length > 0 && (
          <NameValiIcon
            isValidName={isValidName}
            className={`far ${
              isValidName ? "fa-check-circle" : "fa-times-circle"
            }`}
          />
        )}
      </InputContainer>
      <InputContainer>
        <Input type="text" name="email" placeholder="Email" onChange={onChange} maxLength="28"/>
        {email && email.length > 0 && (
          <EmailValiIcon
            isValidEmail={isValidEmail}
            className={`far ${
              isValidEmail ? "fa-check-circle" : "fa-times-circle"
            }`}
          />
        )}
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          name="password"
          placeholder="Password(6자 이상)"
          onChange={onChange}
          maxLength="12"
        />
        {password && password.length > 0 && (
          <PasswordValiIcon
            isValidPassword={isValidPassword}
            className={`far ${
              isValidPassword ? "fa-check-circle" : "fa-times-circle"
            }`}
          />
        )}
      </InputContainer>
      <Button
        isValidName={isValidName}
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
      >
        가입완료
      </Button>
    </SubmitForm>
  </Container>
);

export default SignUpPresenter;
