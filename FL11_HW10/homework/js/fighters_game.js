function Fighter(obj) {
  let health = obj.hp;
  let win = 0;
  let loses = 0;
  this.getName = function() {
    return obj.name;
  };
  this.getDamage = function() {
    return obj.damage;
  };
  this.getAgility = function () {
    return obj.agility;
  };
  this.getHealth = function() {
    return health;
  };
  this.attack = function(enemyObj) {
    let attackProbability = 1 - enemyObj.getAgility() / 100;
    let random = Math.round(Math.random()* 1.1);
    if(random < attackProbability) {
      enemyObj.dealDamage(this.getDamage());
      console.log(`${this.getName()} make ${this.getDamage()} damage to ${enemyObj.getName()}`);
    } else {
      console.log(`${this.getName()} attack missed`);
    }
  };
  this.logCombatHistory = function() {
    return `Name: ${this.getName()}, Wins: ${win}, Losses: ${loses}`;
  };
  this.heal = function(amountHeal) {
    health += amountHeal;
    health = health > obj.hp ? obj.hp : health;
    return health;
  };
  this.dealDamage = function(amountHeal) {
    health -= amountHeal;
    health = health < 0 ? 0 : health;
    return health;
  };
  this.addWin = function() {
    win++;
    return win;
  };
  this.addLoss = function() {
    loses++;
    return loses;
  };
}

const fighter1 = new Fighter({name: 'John', damage: 20, hp: 100, agility: 25});
const fighter2 = new Fighter({name: 'Jim', damage: 10, hp: 120, agility: 40});

function battle(fighter1, fighter2) {
  if(fighter1.getHealth() <= 0) {
    return `${fighter1.getName()} is dead and cant't fight.`
  } else if(fighter2.getHealth() <= 0){
    return `${fighter2.getName()} is dead and cant't fight.`
  } else {
    let stop = false;
    while(!stop) {
      fighter1.attack(fighter2);
      if(fighter1.getHealth() <= 0) {
        fighter2.addWin();
        fighter1.addLoss();
        stop = true;
      } else if(fighter2.getHealth() <= 0) {
        fighter1.addWin();
        fighter2.addLoss();
        stop = true;
      } else {
        fighter2.attack(fighter1);
      }
    }
  }
}

battle(fighter1, fighter2);
