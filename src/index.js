import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createLogger} from 'redux-logger'
import {BrowserRouter} from "react-router-dom";
import rootReducer from "./reducers/rootreducer";

const logger = createLogger({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger))
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
