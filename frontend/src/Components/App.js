import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from "../reducers";
import thunk from 'redux-thunk';
import Router from "../Routes/Router";
import GloboalStyles from "../Components/GlobalStyles";

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
        <GloboalStyles />
      </Provider>
    );
  }
}

export default App;
