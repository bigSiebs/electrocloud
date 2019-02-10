import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
import { library as fontAwesome } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

// We need to include this from the window; otherwise, we don't have the context we need
const { ipcRenderer } = window.require('electron');

fontAwesome.add(faPlay, faPause, faFastForward, faFastBackward);

ReactDOM.render(
  <AppContainer ipcRenderer={ipcRenderer} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
