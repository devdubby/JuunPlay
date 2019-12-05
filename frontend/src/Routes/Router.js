import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Header from "../Components/Header";
import Search from "../Components/Search";
import TV from "../Components/TV";
import Detail from "../Components/Detail";
import Login from "../Components/Login"
import SignUp from "../Components/SignUp";

export default () => (
  <>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/Search" component={Search} />
        <Route path="/TV" component={TV} />
      </Switch>
    </BrowserRouter>
  </>
)