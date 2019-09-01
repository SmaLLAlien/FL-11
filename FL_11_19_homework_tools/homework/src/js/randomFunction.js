
export function getRandomFromArray(arr = arrOfGameStrings) {
  return arr[Math.floor(Math.random() * arr.length)];
}