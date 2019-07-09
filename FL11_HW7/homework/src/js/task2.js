let userChoice = confirm('Do you want to play a game?');
if(userChoice) {
  let nextAgain;
  let nextAgainFlag = false;
  let userGuessIsNull = false;
  let userGuessIsInteger = true;
  let rangeStep = 4;
  const doubleIt = 2;
  const attemptPrizeDecrease = 2;
  let stop = true;
  while(stop) {
    let range = 9;
    let attemptCounter = 3;
    let continueAttemptCounter = 3;
    let attemptPrize = 100;
    let totalPrize = 0;
    let randomNumber = Math.floor(Math.random() * range);
    let correctionPrizeCount = 1;

    while (attemptCounter !== 0) {
      let userGuess = prompt(`Choose a roulette pocket number from 0 to ${range - 1}
Attempts left: ${attemptCounter}\nTotal prize: ${totalPrize}$\nPossible prize on current attempt: ${attemptPrize}$`);
      if(userGuess === null) {
        userGuessIsNull = true;
      } else {
        if(isNaN(+userGuess) || !userGuess.trim() || !Number.isInteger(+userGuess)) {
          userGuessIsInteger = false;
        }
      }
      if(userGuessIsNull || !userGuessIsInteger) {
        alert(`There is no correct number`);
        nextAgainFlag = true;
        userGuessIsInteger = true;
        userGuessIsNull = false;
        break;
      } else {
        userGuess = +userGuess;
        if(userGuess === randomNumber) {
          totalPrize += attemptPrize;
          let nextContinue = confirm(`Congratulation, you won! Your prize is: ${totalPrize}\nDo you want to continue?`);
          if(nextContinue) {
            attemptCounter = continueAttemptCounter;
            attemptPrize = attemptPrize * correctionPrizeCount * doubleIt;
            range += rangeStep;
            correctionPrizeCount = 1;
          } else {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
            nextAgainFlag = true;
            break;
          }
        } else {
          correctionPrizeCount *= doubleIt;
          attemptCounter -= 1;
          attemptPrize /= attemptPrizeDecrease;
          if(attemptCounter === 0) {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
            nextAgainFlag = true;
            break;
          }
        }
      }

    }
    if(nextAgainFlag) {
      nextAgain = confirm(`Do you want to play again?`);
      if(nextAgain) {
        nextAgainFlag = false;
        continue;
      } else {
        stop = false;
      }
    }
  }
} else {
  alert('You did not become a billionaire, but can');
}
