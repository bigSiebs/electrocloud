import Player from './Player.jsx';
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <Player />
        </div>
      </footer>
    );
  }
}

export default Footer;