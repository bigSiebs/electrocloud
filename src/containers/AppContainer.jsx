import React, { Component } from 'react';
import SC from 'node-soundcloud';
import { SOUNDCLOUD_API } from '../constants.js';
import App from 'components/App';

export default class AppContainer extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    const { ipcRenderer } = this.props;
    // var registered = globalShortcut.register('medianexttrack', function () {
    // console.log('medianexttrack pressed');
    // });
    // if (!registered) {
    //   console.log('medianexttrack registration failed');
    // } else {
    //   console.log('medianexttrack registration bound!');
    // }

    ipcRenderer.on('user-authenticated', (event, accessToken) => {
      SC.init({
        id: SOUNDCLOUD_API.CLIENT_ID,
        secret: SOUNDCLOUD_API.CLIENT_SECRET,
        uri: SOUNDCLOUD_API.REDIRECT_URI,
        accessToken: accessToken,
      });
      this.setState({ isAuthenticated: true });
    });

    ipcRenderer.on('mediaplaypause', (event) => {
      console.log(event);
    });

    // var registered = globalShortcut.register('mediaprevioustrack', function () {
    //   console.log('mediaprevioustrack pressed');
    // });
    // if (!registered) {
    //   console.log('mediaprevioustrack registration failed');
    // } else {
    //   console.log('mediaprevioustrack registration bound!');
    // }

    // var registered = globalShortcut.register('mediastop', function () {
    //   console.log('mediastop pressed');
    // });
    // if (!registered) {
    //   console.log('mediastop registration failed');
    // } else {
    //   console.log('mediastop registration bound!');
    // }
  }

  render() {
    return <App isAuthenticated={this.state.isAuthenticated} />;
  }
}
