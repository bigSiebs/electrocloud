import React from 'react';
import MediaButton from './MediaButton';

const ControlBar = ({ isPlaying, onPlayClick, onFastBackwardClick, onFastForwardClick }) => (
  <div className="player__controls">
    <MediaButton action="fast-backward" onClick={onFastBackwardClick} />
    <MediaButton action={isPlaying ? 'pause' : 'play'} outline onClick={onPlayClick} />
    <MediaButton action="fast-forward" onClick={onFastForwardClick} />
  </div>
);

export default ControlBar;

