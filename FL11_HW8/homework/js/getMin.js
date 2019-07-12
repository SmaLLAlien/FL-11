function getMin() {
  let min = arguments[0];
  for(let i = 0; i < arguments.length; i++) {
    min = min >= arguments[i] ? arguments[i] : min;
  }
  return min;
}

getMin(52, 0, -25);