export function compare(target, randomString, wins, losts) {
  // let tempWins = wins;
  // let tempLosts = losts;
  let roundsResult = 'str';
  console.log(target, "target");
  console.log(randomString, "randomString");
  if(target === randomString) {
    roundsResult = 'Let`s do it again'
  }
  if(target === 'rock' && randomString === 'papper') {
    roundsResult = `you've lost`;
    losts++
  }
  if(target === 'rock' && randomString === 'scissors') {
    roundsResult = `you win`;
    wins++;
  }
  if(target === 'scissors' && randomString === 'papper') {
    roundsResult = `you win`;
    wins++
  }
  if(target === 'scissors' && randomString === 'rock') {
    roundsResult = `you've lost`;
    losts++
  }
  if(target === 'papper' && randomString === 'rock') {
    roundsResult = `you win`;
    wins++
  }
  if(target === 'papper' && randomString === 'scissors') {
    roundsResult = `you've lost`;
    losts++
  }
  return {
    roundsResult,
    wins,
    losts
  }
}