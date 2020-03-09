import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Home from "../Components/Home";
import Header from "../Components/Header";
import Search from "../Components/Search";
import TV from "../Components/TV";
import Detail from "../Components/Detail";
import Login from "../Components/Login"
import SignUp from "../Components/SignUp";
import { checkLoginUser } from "../actions";

function Router() {
  const jwtToken = useSelector(state => state.auth.jwtToken);
  const isLogin = jwtToken === "" ? false : true;
  const dispatch = useDispatch();

  const callApi = useCallback(async () => {
    await dispatch(checkLoginUser(jwtToken));
  }, []);

  useEffect(() => {
    //login 유효 검사
    const jwtToken = localStorage.getItem("jwtToken");
    if(jwtToken) {
      callApi();
    }
  }, [callApi]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/TV" component={TV} />
          <PrivateRoute path="/login" isLogin={isLogin} component={Login} />
          <PrivateRoute path="/signup" isLogin={isLogin} component={SignUp} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/show/:id" component={Detail} />
          <Route path="/Search" component={Search} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;