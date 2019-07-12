function pipe(num) {
  for(let i = 1; i < arguments.length; i++) {
    let func;
    func = arguments[i];
    num = func(num);
  }
  return num;
}
function addOne(addend) {
  return addend + 1;
}

pipe(2, addOne);