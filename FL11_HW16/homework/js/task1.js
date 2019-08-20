function assign(target, ...sources) {
  if (target === null || target === undefined) {
    return 'Cannot convert first argument to object';
  }
  for (let i = 0; i < sources.length; i += 1) {
    if (sources[i] !== null || sources[i] !== undefined) {
      const objParam = sources[i];
      // get only own and enumerable keys
      const objParamKeys = Object.keys(objParam);
      for (let j = 0; j < objParamKeys.length; j += 1) {
        target[objParamKeys[j]] = objParam[objParamKeys[j]];
      }
    }
  }

  return target;
}

const testAssign = {};
const object1 = { a: 1 };
const object2 = '123';
const object3 = { a: 100 };

// test enumerable
Object.defineProperty(object1, 'b', { enumerable: false, value: 2 });

assign(testAssign, object1, object2, object3);
console.log(testAssign, 'test assign');
