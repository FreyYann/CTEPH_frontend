import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from  'react-redux';
// import Routes from './router';
import {store} from  './store';
import Routes from './Router';
require('./global.scss');

ReactDOM.render(
  <Provider store={store}>
  <Routes />
</Provider>,
document.getElementById('app'));
