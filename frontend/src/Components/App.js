import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from "../reducers";
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Router from "../Routes/Router";
import Login from "../Components/Login"
import SignUp from "../Components/SignUp";
import GloboalStyles from "../Components/GlobalStyles";

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Router />
          </Switch>
          <GloboalStyles />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
