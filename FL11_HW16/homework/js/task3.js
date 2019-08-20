function Pokemon() {
  const time = new Date().getTime();
  this.health = 100;
  this.lastTimeEat = time;
  this.isDead = false;
}

function Charmander() {
  Pokemon.apply(this);
  this.type = 'Fire';
  this.specie = 'Lizard Pokemon';
  this.wings = false;
  this.level = 16;
  this.maxLevel = 16;

  // MY CUSTOM IDEAS
  this.damage = 10;
  this.shield = 1;
}
function Charmeleon() {
  Charmander.apply(this);
  this.specie = 'Flame Pokemon';
  this.level = 36;
  this.maxLevel = 36;

  // MY CUSTOM IDEAS
  this.damage = 20;
  this.shield = 5;
}

function Charizard() {
  Charmeleon.apply(this);
  this.level = 36;
  this.maxLevel = this.level;
  this.wings = true;

  // MY CUSTOM IDEAS
  this.damage = 30;
  this.shield = 10;
  this.isUltra = true;
  this.ultraTime = new Date().getTime();
}


Pokemon.prototype.getType = function () {
  return this.type;
};
Pokemon.prototype.getSpecie = function () {
  return this.specie;
};
Pokemon.prototype.canFly = function () {
  return this.wings;
};
Pokemon.prototype.getPokemonType = function () {
  return this.constructor.name;
};

/* MY CUSTOM IDEAS
****************************************************
 */
// POKEMONS CAN ATTACK EACH OTHER
Pokemon.prototype.attack = function (defender) {
  if (defender.isDead || this.isDead) {
    return console.log(`${this.getPokemonType()}: What Is Dead May Never Die`);
  }
  if (defender.shield > 0) {
    defender.shield -= this.damage;
  } else {
    defender.health -= this.damage;
  }
  if (defender.health < 20 && defender.health > 0) {
    const ask = confirm('I`m scared. Maybe we will stop?');
    if (ask) {
      return 'Thank you';
    }
    defender.poop();
    alert(`${this.getPokemonType()}: FINISH HIM`);
  }

  if (defender.health <= 0) {
    this.level++;
    this.say('Не лезь на Джедай мастера сынок');
    defender.health = 0;
    defender.say('Oh my God, they killed Kenny! You bastard[s]');
    defender.isDead = true;
  }
};

// YOU CAN FEED YOUR POKEMON TO INCREASE HIS POWER AND HEALTH
Pokemon.prototype.feed = function () {
  if (this.isDead) {
    return console.log(`${this.getPokemonType()}: Im dead dude`);
  }
  const threeMinutes = 1000 * 60 * 3;
  if (-this.lastTimeEat + new Date().getTime() < threeMinutes) {
    return 'I can`t eat too often';
  }
  this.health += 10;
  this.shield *= 1.2;
  this.damage *= 1.5;
};

// IF SCARED
Pokemon.prototype.poop = function () {
  if (this.isDead) {
    return console.log(`${this.getPokemonType()}: Im dead dude`);
  }
  console.log(`${this.getPokemonType()}: POOP`);
};

Pokemon.prototype.say = function (say = this.getPokemonType()) {
  if (this.isDead) {
    return console.log(`${this.getPokemonType()}: Im dead dude`);
  }
  console.log(`${this.getPokemonType()}: ${say}`);
};

// LAST EVOLUTION HAS ULTRA ATTACK
Pokemon.prototype.ultra = function (defender) {
  const name = this.getPokemonType();
  if (name === 'Charizard' || name === 'Raichu') {
    if (defender.isDead) {
      return console.log(`${this.getPokemonType()}: He is dead dude`);
    }
    const oneMinute = 1000 * 60;
    if (this.isUltra) {
      defender.health -= 2 * this.damage;
      this.isUltra = false;
      this.ultraTime = new Date().getTime();
      console.log('Unstoppable');
      if (defender.health <= 0) {
        this.level++;
        this.say('Who is your Daddy now?');
        defender.health = 0;
        defender.say('I see the light in the tunnel');
        defender.isDead = true;
      }
    } else {
      if (new Date().getTime() - this.ultraTime < oneMinute) {
        return console.log('Ultra is not ready');
      }
      this.isUltra = true;
      console.log('I`m ready. Lets make it');
    }
  } else {
    this.say('I have to evolve for this');
  }
};

/** ************************************************ */

Charmander.prototype = Object.create(Pokemon.prototype);
Charmander.prototype.constructor = Charmander;

Charmeleon.prototype = Object.create(Charmander.prototype);
Charmeleon.prototype.constructor = Charmeleon;

Charizard.prototype = Object.create(Charmeleon.prototype);
Charizard.prototype.constructor = Charizard;

Charmander.prototype.evolve = function () {
  if (this.level >= this.maxLevel) {
    return new Charmeleon();
  }
  return console.log('not ready');
};

Charmeleon.prototype.evolve = function () {
  if (this.level >= this.maxLevel) {
    return new Charizard();
  }
  return console.log('not ready');
};

Charizard.prototype.evolve = function () {
  return this;
};


const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

function Pichu() {
  Pokemon.apply(this);
  this.type = 'Electric';
  this.specie = 'Mouse Pokemon';
  this.isHappy = true;
  this.isUseThuderstone = true;
  // MY CUSTOM IDEAS
  this.damage = 10;
  this.shield = 1;
  this.level = 0; // for pikachu types it is not needed by default, but left it for methods
}

function Pikachu() {
  Pichu.apply(this);
  this.nextEvolution = Raichu;

  // MY CUSTOM IDEAS
  this.damage = 20;
  this.shield = 5;
}

function Raichu() {
  Pikachu.apply(this);

  // MY CUSTOM IDEAS
  this.damage = 30;
  this.shield = 10;
  this.isUltra = true;
  this.ultraTime = new Date().getTime();
}

Pichu.prototype = Object.create(Pokemon.prototype);
Pichu.prototype.constructor = Pichu;

Pikachu.prototype = Object.create(Pichu.prototype);
Pikachu.prototype.constructor = Pikachu;

Raichu.prototype = Object.create(Pikachu.prototype);
Raichu.prototype.constructor = Raichu;

Pikachu.prototype.say = function (say = 'Pika pika') {
  if (this.isDead) {
    return console.log(`${this.getPokemonType()}: Im dead dude`);
  }
  console.log(`${this.getPokemonType()}: ${say}`);
};

Pichu.prototype.evolve = function () {
  if (this.isHappy) {
    return new Pikachu();
  }
};

Pikachu.prototype.evolve = function () {
  if (this.isUseThuderstone) {
    return new Raichu();
  }
};

Raichu.prototype.evolve = function () {
  return this;
};

//
// const pichu = new Pichu();
// const pikachu = new Pikachu();
// const raichu = new Raichu();
