function reverseNumber(number) {
  let isLessZero = false;
  let arr = [];
  const tens = 10;
  let remainder = 1;
  let reversedNumber = 0;

  if(number < 0) {
    isLessZero = true;
    number = Math.abs(number);
  }
  for(let i = 0; number !== 0 ; i++) {
    remainder = number % tens;
    number = Math.floor(number / tens);
    arr[i] = remainder;
  }
  const arrLength = arr.length;
  for(let i = arrLength - 1; i >= 0; i--) {
    reversedNumber = reversedNumber + arr[i] * Math.pow(tens, arrLength - i - 1);
  }
  if(isLessZero) {
    reversedNumber = -reversedNumber;
  }
  return reversedNumber;
}
reverseNumber(10000);