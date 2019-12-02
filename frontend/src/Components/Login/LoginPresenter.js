import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0px!important;
  &::after {
    background-image: url('https://image.tmdb.org/t/p/original/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    top:0;
    left:0;
    position:absolute;
    opacity:0.3!important;
    z-index:-1;
    content:"";
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
`;

const SignUpButton = styled(Link)`
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 0.4px solid white;
  border-radius: 25px;
  width: 17vw;
  height: 5.5vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPresenter = ({ onChange, onSubmit }) => (
  <Container>
    <SubmitForm onSubmit={onSubmit}>
      <Title>Junflix</Title>
      <Input type="text" id="email" placeholder="Email" onChange={onChange} />
      <Input type="password" id="password" placeholder="Password" onChange={onChange} />
      <Button>로그인</Button>
      <SignUpButton to="/signup">회원가입</SignUpButton>
    </SubmitForm>
  </Container>
);

export default LoginPresenter;