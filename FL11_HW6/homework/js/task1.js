let firstPointX = prompt('Enter coordinate X of first point');
let firstPointY = prompt('Enter coordinate Y of first point');
let secondPointX = prompt('Enter coordinate Y of second point');
let secondPointY = prompt('Enter coordinate Y of second point');
let thirdPointX = prompt('Enter coordinate Y of third point');
let thirdPointY = prompt('Enter coordinate Y of third point');
const HALF = 2;
const HUNDRED = 100;

if(firstPointX === null || firstPointY === null ||secondPointX === null ||
    secondPointY === null || thirdPointX === null || thirdPointY === null) {
  console.log(false);
} else {
  if(isNaN(+firstPointX) || isNaN(+firstPointY) || isNaN(+secondPointX) ||
      isNaN(+secondPointY) || isNaN(+thirdPointX) || isNaN(+thirdPointY)) {
    console.log(false);
  } else {
    let middleX = (+firstPointX + +thirdPointX) / HALF;
    let middleY = (+firstPointY + +thirdPointY) / HALF;
    middleX = Math.round(middleX * HUNDRED) / HUNDRED;
    middleY = Math.round(middleY * HUNDRED) / HUNDRED;
    if(middleX === +secondPointX && middleY === +secondPointY) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
}
