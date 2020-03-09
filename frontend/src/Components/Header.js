import React, { useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const HeaderContainer = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  padding: 0px 20px;
`;

const List = styled.ul`
  display: flex;
  flex: 1;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const AuthButtonDiv = styled.div`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid transparent;
`;

const LogoutButton = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 13px;
  outline: none;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header({ location: { pathname } }) {
  const jwtToken = useSelector(state => state.auth.jwtToken);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  }, []);

  return (
    <HeaderContainer>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">Movies</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>
      </List>
      <AuthButtonDiv>
        {jwtToken ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <SLink to="/login">Login</SLink>
        )}
      </AuthButtonDiv>
    </HeaderContainer>
  );
};

export default withRouter(Header);
