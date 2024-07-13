// 函数组装

function one(action) {
  action = action * 2;
  return action;
}

function two(action) {
  action = action + 20;
  return action;
}

function three(action) {
  action = action / 4;
  return action;
}

// const compose = (list) =>
//     list.reduceRight(
//         (a, b) =>
//         (...args) => a(b(...args))
//     )

const compose = (list) => (params) =>
  list.reduce((pre, current) => current(pre), params);

const functionList = [one, two, three];

const composeFunction = compose(functionList);

console.log(composeFunction(6));
