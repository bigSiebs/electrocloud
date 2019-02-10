import React from 'react';
import format_seconds from '../utils/format_seconds';

const ControlBar = ({ totalSeconds, elapsedSeconds }) => (
  <div className="progress">
    <span className="progress__time">{format_seconds(elapsedSeconds)}</span>
    <div className="progress-bar">
      <div className="progress-bar__inner" style={{ width: `${elapsedSeconds / totalSeconds * 100}%` }} />
    </div>
    <span className="progress__time">{format_seconds(totalSeconds)}</span>
  </div>
);

export default ControlBar;

