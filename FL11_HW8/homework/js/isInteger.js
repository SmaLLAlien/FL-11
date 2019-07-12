function isInteger(num) {
  if(typeof num === 'number') {
    if(!isNaN(num)) {
      let remaind = num % 1;
      if(remaind) return false;
      else return true;
    }
  }
  return false;
}
isInteger(5);
