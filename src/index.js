import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'containers/AppContainer';

ReactDOM.render(<AppContainer ipcRenderer={ipcRenderer} />, document.getElementById('app'));
