
import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <a href=""><i className="fa fa-fast-backward"></i></a>
        <a href=""><i className="fa fa-play"></i></a>
        <a href=""><i className="fa fa-fast-forward"></i></a>
      </div>
    );
  }
}

export default Player;