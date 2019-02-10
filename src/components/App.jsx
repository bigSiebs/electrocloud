import React from 'react';
import Player from './Player.jsx';

const App = ({ isAuthenticated, sound, isPlaying, elapsedSeconds, totalSeconds, onPlayClick, onFastBackwardClick, onFastForwardClick }) => (
  <div className="app">
    <Player
      sound={sound}
      isPlaying={isPlaying}
      elapsedSeconds={elapsedSeconds}
      totalSeconds={totalSeconds}
      onPlayClick={onPlayClick}
      onFastBackwardClick={onFastBackwardClick}
      onFastForwardClick={onFastForwardClick}
    />
  </div>
);

export default App;
