// import './common.js'
import '../css/main.css'
import '../scss/main.scss'
import {getRandomFromArray} from './randomFunction.js'
import {compare} from './compare.js'

const rockBtn = document.querySelector('.btn_rock');
const papperBtn = document.querySelector('.btn_papper');
const scissorsBtn = document.querySelector('.btn_scissors');
const resetBtn = document.querySelector('.btn_reset');
const divRounds = document.querySelector('.rounds');
let arrOfGameStrings = ['rock', 'papper', 'scissors'];
let body = document.getElementsByTagName('body')[0];
let wins = 0;
let losts = 0;
let countRounds = 0;

let buttons = document.getElementsByClassName('btn');
for(let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', game)
}
resetBtn.addEventListener('click', reset);


function game(event) {
  let choosen = event.target.textContent.toLowerCase();

    countRounds++;
    let rand = getRandomFromArray(arrOfGameStrings);
    let roundResult = compare(choosen, rand, wins, losts).roundsResult;
    wins = compare(choosen, rand, wins, losts).wins;
    losts = compare(choosen, rand, wins, losts).losts;
    if(wins >= 3){
      let final = document.createElement('div');
      final.textContent = `Congratulate, you win 3 times`;
      divRounds.appendChild(final);
    } else if(losts >= 3) {
      let final = document.createElement('div');
      final.textContent = `Sorry, you lost 3 times. To start new game press Reset button`;
      divRounds.appendChild(final);

    } else {
      let roundsWrapper = document.createElement('div');
      let roundsHeader = document.createElement('h2');
      let roundsContent = document.createElement('p');
      roundsHeader.textContent = `ROUND ${countRounds}`;
      roundsContent.textContent = `${choosen} vs ${rand}: ${roundResult}`;

      roundsWrapper.appendChild(roundsHeader);
      roundsWrapper.appendChild(roundsContent);
      divRounds.appendChild(roundsWrapper);
    }
}

function reset() {
  wins = 0;
  losts = 0;
  countRounds = 0;
  divRounds.textContent = '';
}
