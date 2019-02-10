import pad from './pad';

const format_seconds = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${pad(seconds, 2)}`;
};

export default format_seconds;
