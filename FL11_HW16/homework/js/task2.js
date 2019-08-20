function create(objToProto, newObjProperties) {
  let obj = {};
  if (objToProto === null) {
    return { __proto__: null };
  } else if (objToProto !== null && typeof objToProto !== 'object') {
    return 'proto should be an object';
  }
  function F() {
 return 1; 
}
  F.prototype = objToProto;
  obj = new F();
  if (newObjProperties) {
    Object.defineProperties(obj, newObjProperties);
  }
  return obj;
}

const test = { a: 1, b: 2 };
const testCreate = create(test);
console.log(testCreate, 'test create');
