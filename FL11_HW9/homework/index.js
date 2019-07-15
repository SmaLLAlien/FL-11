function getNumbers(str) {
  let arrNumbers = [];
  let arrCounter = 0;
  for(let i = 0; i < str.length; i++) {
    if(!isNaN(+str[i])) {
      arrNumbers[arrCounter] = +str[i];
      arrCounter++;
    }
  }
  return arrNumbers;
}
getNumbers('string');

function findTypes() {
  let obj = {};
  let key;
  const argLength = arguments.length;
  for(let i = 0; i < argLength; i++) {
    key = typeof arguments[i];
      if(obj.hasOwnProperty([key])) {
        obj[key] += 1;
      } else {
 obj[key] = 1 
}
  }
  return obj;
}
findTypes(null, 5, 'hello');

function executeforEach(arr, func) {
  const arrLength = arr.length;
  for(let i = 0; i < arrLength; i++) {
    func(arr[i]);
  }
}
executeforEach([1,2,3], function(el){
 console.log(el) 
});

function mapArray(arr, func) {
  let result = [];
  executeforEach(arr, callBackForEach);
  function callBackForEach(elem) {
    result.push(func(elem));
  }
  return result;
}
mapArray([2, 5, 8], function(el) {
 return el + 3 
});

function filterArray(arr, func) {
  let result = [];
  let resultCount = 0;
  executeforEach(arr, callBackForEach);
  function callBackForEach(elem) {
    if(func(elem)) {
      result[resultCount] = elem;
      resultCount++;
    }
  }
  return result;
}
filterArray([2, 5, 8], function(el) {
 return el > 3 
});

function showFormattedDate(date) {
  const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthesLength = monthes.length;
  let month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  for(let i = 0; i < monthesLength; i++) {
    if(month === i) {
      month = monthes[i];
    }
  }
  return `Date: ${month} ${day} ${year}`;
}
showFormattedDate(new Date('2019-01-27T01:10:00'));

function canConvertToDate(str) {
  let isConvertable = isNaN(Date.parse(str));
  return !isConvertable;
}
canConvertToDate('2016-13-18T00:00:00');

function daysBetween(firstDate, secondDate) {
  const miliSecInDay = 86400000;
  let days = Math.round(Math.abs(secondDate - firstDate) / miliSecInDay);
  return days;
}
daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

function getAmountOfAdultPeople(arrayOfPeople) {
  let grownUpPeople = filterArray(arrayOfPeople, getGrownUpPeople);
  function getGrownUpPeople(obj) {
    const lookingProperty = 'birthday';
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        if(key.trim() === lookingProperty) {
          const daysInYear = 365;
          const grownUpAge = 18;
          let age = daysBetween(new Date(obj[key]), new Date()) / daysInYear;
          return age > grownUpAge;
        }
      }
    }
  }
  return grownUpPeople.length;
}
let data = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    ' birthday ': '2016-03-18T00:00:00',
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    ' birthday ': '1991-02-11T00:00:00',
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    ' birthday ': '1984-04-17T00:00:00',
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    ' birthday ': '1994-04-17T00:00:00',
    'eyeColor': 'green',
    'name': 'George',
    'favoriteFruit': 'banana'
  }
];
getAmountOfAdultPeople(data);

function keys(obj) {
  let keysArray = [];
  let positionInArray = 0;
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      keysArray[positionInArray] = key;
      positionInArray++;
    }
  }
  return keysArray;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3});

function values(obj) {
  let valuesArray = [];
  let positinInArray = 0;
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      valuesArray[positinInArray] = obj[key];
      positinInArray++;
    }
  }
  return valuesArray;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3});
