function Hamburger(type, calories, isNeededSecretIngredient) {
  this.type = type;
  let cheeseAddCount = 0;
  let tomatoAddCount = 0;
  let secretIngredientAddCount = 0;
  let biteCounts = 0;
  if(isNeededSecretIngredient) {
    secretIngredientAddCount++;
    calories += 100;
  }

  this.setCalories = function(userCalories) {
    return calories = userCalories;
  };
  this.getCalories = function() {
    return calories;
  };
  this.addCheese = function (){
    if(biteCounts > 0) {
      console.log('Sorry you cant add cheese');
    } else if(cheeseAddCount > 0) {
      console.log('Sorry, you can add cheese only once')
    } else {
      this.setCalories(this.getCalories() + 120);
      cheeseAddCount++;
    }
  };
  this.addTomato = function() {
    if(biteCounts > 0) {
      console.log('Sorry you cant add tomato');
    } else if(tomatoAddCount > 1) {
      console.log('Sorry, you can add tomato only twice');
    } else {
      this.setCalories(this.getCalories() + 20);
      tomatoAddCount++;
    }
  };
  this.addSecretIngredient = function() {
    if(biteCounts > 0) {
      console.log('Sorry you cant add secret ingredient');
    } else if(secretIngredientAddCount > 0) {
      console.log('Sorry, you can add secret ingredient only once');
    } else if(cheeseAddCount !== 0 || tomatoAddCount !== 0){
      console.log('Sorry, you can add secret ingredient only before another ingredient')
    } else {
      this.setCalories(this.getCalories() + 100);
      secretIngredientAddCount++;
    }
  };
  this.bite = function () {
    biteCounts += 1;
  };
  this.info = function() {
    let secret = `${secretIngredientAddCount > 0 ? 'with secret ingredient, ' : 'no secret ingredient,'}`;
    let cheese = `${cheeseAddCount > 0 ? 'with cheese, ' : 'no cheese,'}`;
    let tomato = `${tomatoAddCount > 1 ? `with ${tomatoAddCount} tomatoes,`: `${tomatoAddCount > 0 ? `with ${tomatoAddCount} tomato,` : 'no tomato,'}`}`;
    let bites = `${biteCounts > 0 ? `is bite ${biteCounts} time${biteCounts > 1 ? 's' : ''}` : 'full hamburger:no bites'}`;


    return`${type} hamburger: ${secret} ${cheese} ${tomato} ${bites}. Total calories: ${this.getCalories()}`;
  }
}
my2 = new Hamburger('clasic', 600);