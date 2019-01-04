import React, { Component } from 'react';

export default class AppContainer extends Component {
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

    ipcRenderer.on('user-authenticated', (event, message) => {
      console.log(event, message);
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
    return (
      <div>My app will go here.</div>
    );
  }
}
