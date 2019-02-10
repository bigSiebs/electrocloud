import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MediaButton = ({ action, outline, onClick }) => (
  <button className={`btn btn-media ${outline ? 'btn-outline' : ''}`} onClick={onClick}>
    <FontAwesomeIcon icon={action} />
  </button>
);

export default MediaButton;

