import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './Components/App';
import { checkLoginUser } from './actions';
import './api';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

async function check() {
  //login 유효 검사
  const jwtToken = localStorage.getItem('jwtToken');
  try {
    if (jwtToken) {
      await store.dispatch(checkLoginUser(jwtToken));
    }
  } catch (e) {
    console.log('error', e);
  }
}

check();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
