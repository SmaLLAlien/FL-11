/***************************************************
 TASK 1
 **************************************************/

function maxElement(array) {
  return Math.max(...array);
}

const array = [1,2,3,4,56,7,8,76,5,241,5,356,567,2];

console.log(maxElement(array));
/***************************************************
 TASK 2
 **************************************************/
function copyArray(array) {
  return newArray = [...array];
}

const array2 = [1,2,3];
const copiedArray = copyArray(array2);

console.log(array2, copiedArray);
console.log(array2 === copiedArray);

/***************************************************
 TASK 3
 **************************************************/

function addUniqueID(obj) {
  let id = Symbol('id');
  let newObj = {[id]:'something', ...obj};

  return newObj;
}

const task3Obj = {a: 1, b: 2};
const newObj = addUniqueID(task3Obj);

console.log(newObj, 'newObj');
console.log(task3Obj, 'task3Obj');
console.log(newObj[Object.getOwnPropertySymbols(newObj)[0]], ' <-:newObj Symbol property data');

/***************************************************
 TASK 4
 **************************************************/

function regroupObject(oldObj) {
  const {name: firstName, details: {id, age, university}} = oldObj;
  return {university, user: {id, firstName, age}};
}

const task4Obj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};

console.log(regroupObject(task4Obj), 'task4Obj');

/***************************************************
 TASK 5
 **************************************************/

function findUniqueElement(array) {
  return [...new Set(array)];
}

const array5 = [1,1,23,3,4,5,6,5,4,23,2,1,1,1,1];

console.log(findUniqueElement(array5), 'array5');

/***************************************************
 TASK 6
 **************************************************/

function hideNumber(phoneNumber, digitsToShow = 4) {
  return phoneNumber.substr(-digitsToShow)
                    .padStart(phoneNumber.length, '*');
}

const phoneNumber6 = '0123456789';

console.log(hideNumber(phoneNumber6), 'phoneNumber6');

/***************************************************
 TASK 7
 **************************************************/

function add(a = (() => {throw new Error('Missing property is required')})(),
             b = (() => {throw new Error('Missing property is required')})()) {

  return a + b;
}

add(1, 2);
//console.log(add(1));

/***************************************************
 TASK 8
 **************************************************/

function getNames(url) {
  fetch(url)
          .then(answer => {
            if(answer.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + answer.status);
              return;
            }
            return value = answer.json()
          })
          .then(value =>  {
            let arr = value.map(obj => obj.name);
            arr.sort(( a, b) => a.localeCompare(b));
            console.log(arr);
          })
          .catch(err => console.log(err));
}

getNames('https://api.github.com/users/SmaLLAlien/repos');

/***************************************************
 TASK 9
 **************************************************/

async function getNames2(url) {
  jsonData = async (answer) => {
    if(answer.status !== 200) {
      err = `Looks like there was a problem. Status Code: ' ${answer.status}`;
      throw new Error(error(err));
    }
    return answer.json();
  };
  let names =  (value) => {
    let arr = value.map(obj => obj.name);
    arr.sort(( a, b) => a.localeCompare(b));
    return arr;
  };
  let error =  (err) => {
    console.log(err)
  };

  try {
    let fetching  = await fetch(url);
    let notSortedArr = await jsonData(fetching);
    let sortedArr =  names(notSortedArr);
    console.log(sortedArr);
  } catch (err) {
    error(err);
  }
}

getNames2('https://api.github.com/users/SmaLLAlien/repos');
