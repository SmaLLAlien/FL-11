class Hamburger{
  constructor(type, calories, isNeededSecretIngredient) {
    this.type = type;
    this.getCalories = function() {
      return calories;
    };
    this.setCalories = function(cal) {
      return calories = cal;
    };
    this._cheeseAddCount = 0;
    this._tomatoAddCount = 0;
    this._secretIngredientAddCount = 0;
    this._biteCounts = 0;
    if(isNeededSecretIngredient) {
      this._secretIngredientAddCount++;
      calories += 100;
    }
  }
  addCheese() {
    if(this._biteCounts > 0) {
      console.log('Sorry you cant add cheese');
    } else if(this._cheeseAddCount > 0) {
      console.log('Sorry, you can add cheese only once')
    } else {
      let calories = this.getCalories() + 120;
      this.setCalories(calories);
      this._cheeseAddCount++;
    }
  }
  addTomato() {
    if(this._biteCounts > 0) {
      console.log('Sorry you cant add tomato');
    } else if(this._tomatoAddCount > 1) {
      console.log('Sorry, you can add tomato only twice');
    } else {
      let calories = this.getCalories() + 20;
      this.setCalories(calories);
      this._tomatoAddCount++;
    }
  }
  addSecretIngredient() {
    if(this._biteCounts > 0) {
      console.log('Sorry you cant add secret ingredient');
    } else if(this._secretIngredientAddCount > 0) {
      console.log('Sorry, you can add secret ingredient only once');
    } else if(this._cheeseAddCount !== 0 || this._tomatoAddCount !== 0){
      console.log('Sorry, you can add secret ingredient only before another ingredient')
    } else {
      let calories = this.getCalories() + 100;
      this.setCalories(calories);
      this._secretIngredientAddCount++;
    }
  }
  bite() {
    this._biteCounts += 1;
  }
  info() {
    let secret = `${this._secretIngredientAddCount > 0 ? 'with secret ingredient, ' : 'no secret ingredient,'}`;
    let cheese = `${this._cheeseAddCount > 0 ? 'with cheese, ' : 'no cheese,'}`;
    let tomato = `${this._tomatoAddCount > 1 ? `with ${this._tomatoAddCount} tomatoes,`: `${this._tomatoAddCount > 0 ? `with ${this._tomatoAddCount} tomato,` : 'no tomato,'}`}`;
    let bites = `${this._biteCounts > 0 ? `is bite ${this._biteCounts} time${this._biteCounts > 1 ? 's' : ''}` : 'full hamburger:no bites'}`;

    return`${this.type} hamburger: ${secret} ${cheese} ${tomato} ${bites}. Total calories: ${this.getCalories()}`;
  }
}

my = new Hamburger('classic', 600);