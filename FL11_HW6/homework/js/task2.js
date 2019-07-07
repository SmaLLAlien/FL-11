let firstSide = +prompt('Enter the length of firstSide of triangle', 1);
let secondSide = +prompt('Enter the length of secondSide of triangle', 1);
let thirdSide = +prompt('Enter the length of thirdSide of triangle', 1);
if(isNaN(firstSide) || isNaN(secondSide) || isNaN(thirdSide) ||
  (firstSide <= 0 || secondSide <= 0 || thirdSide <= 0)){
  console.log('Triangle doesn’t exist');
  } else {
    if(firstSide + secondSide > thirdSide &&
      firstSide + thirdSide > secondSide &&
      secondSide + thirdSide > firstSide ){
        if(firstSide === secondSide && firstSide === thirdSide && secondSide === thirdSide) {
          console.log('Eequivalent triangle');
        } else {
          if(firstSide === secondSide || secondSide === thirdSide || firstSide === thirdSide) {
            console.log('Isosceles triangle');
          } else {
            console.log('Normal triangle');
          }
        }
} else {
    console.log('Triangle doesn’t exist');
  }
}
