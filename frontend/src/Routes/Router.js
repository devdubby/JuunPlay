import React from "react";
import { Route } from "react-router-dom";
import Home from "../Components/Home";
import Header from "../Components/Header";
import Search from "../Components/Search";
import TV from "../Components/TV";
import Detail from "../Components/Detail";

export default () => (
  <>
    <Header />
    <Route path="/home" component={Home} />
    <Route path="/movie/:id" component={Detail} />
    <Route path="/show/:id" component={Detail} />
    <Route path="/Search" component={Search} />
    <Route path="/TV" component={TV} />
  </>
)