import React, { Component } from 'react';
import SC from 'node-soundcloud';
import App from '../components/App';

class AppContainer extends Component {
  state = {
    isAuthenticated: false,
    isPlaying: false,
    elapsedSeconds: 0,
    totalSeconds: 180,
  };

  componentDidMount() {
    const { ipcRenderer } = this.props;

    ipcRenderer.on('user-authenticated', (event, accessToken) => {
      SC.init({
        id: process.env.SOUNDCLOUD_CLIENT_ID,
        secret: process.env.SOUNDCLOUD_CLIENT_SECRET,
        uri: process.env.SOUNDCLOUD_REDIRECT_URI,
        accessToken: accessToken,
      });

      SC.getMe((error, user) => {
        console.log(error, user);
      });

      this.setState({ isAuthenticated: true });
    });

    ipcRenderer.on('mediaplaypause', (event) => {
      this.handlePlayClick(event);
    });

    ipcRenderer.on('mediaprevioustrack', (event) => {
      this.handleFastBackwardClick(event);
    });

    ipcRenderer.on('medianexttrack', (event) => {
      this.handleFastForwardClick(event);
    });

    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlePlayClick = (e) => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  }

  handleFastBackwardClick = (e) => {
    this.setState({ elapsedSeconds: 0 });
  }

  handleFastForwardClick = (e) => {
    this.setState({ elapsedSeconds: 0 });
  }

  tick = () => {
    if (!this.state.isPlaying) {
      return false;
    }

    this.setState((prevState) => ({
      elapsedSeconds: prevState.elapsedSeconds === prevState.totalSeconds ? 0 : ++prevState.elapsedSeconds,
    }));
  }

  render() {
    return (
      <App
        isAuthenticated={this.state.isAuthenticated}
        sound={{ user: "Cypress Hill", name: "Hits from the Bong" }}
        isPlaying={this.state.isPlaying}
        elapsedSeconds={this.state.elapsedSeconds}
        totalSeconds={this.state.totalSeconds}
        onPlayClick={this.handlePlayClick}
        onFastBackwardClick={this.handleFastBackwardClick}
        onFastForwardClick={this.handleFastForwardClick}
      />
    );
  }
}

export default AppContainer;
