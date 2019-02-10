import React from 'react';
import ControlBar from './ControlBar';
import Progress from './Progress';

const Player = ({ sound, isPlaying, elapsedSeconds, totalSeconds, onPlayClick, onFastBackwardClick, onFastForwardClick }) => (
  <div className="player">
    <div className="player__header">
      <img src="../img/album.png" alt="[Album]" />
      <p>{sound.user} - {sound.name}</p>
    </div>
    <div className="player__footer">
      <ControlBar
        isPlaying={isPlaying}
        onPlayClick={onPlayClick}
        onFastBackwardClick={onFastBackwardClick}
        onFastForwardClick={onFastForwardClick}
      />
      <Progress totalSeconds={totalSeconds} elapsedSeconds={elapsedSeconds} />
    </div>
  </div>
);

export default Player;
