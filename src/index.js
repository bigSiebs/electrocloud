<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
import { library as fontAwesome } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

// We need to include this from the window; otherwise, we don't have the context we need
const { ipcRenderer } = window.require('electron');

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'containers/AppContainer';

import { fontAwesome } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

fontAwesome.add(faPlay, faPause, faFastForward, faFastBackward);

ReactDOM.render(
  <AppContainer ipcRenderer={ipcRenderer} />,
  document.getElementById('app')
);
