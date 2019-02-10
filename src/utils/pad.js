const pad = (n, width, ch = '0') => {
  n = n.toString();
  return n.length >= width ? n : new Array(width - n.length + 1).join(ch) + n;
}

export default pad;
