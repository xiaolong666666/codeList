function myNew(constructorFunction, ...args) {
  const obj = Object.create(constructorFunction.prototype)
  const res = constructorFunction.apply(obj, args)
  if (res instanceof Object) {  // 如果构造函数中有对象返回值需要返回
    return res
  } else {
    obj
  }
}

function Game(name) {
  this.name = name
  // return Object(undefined)
}

const g = new Game('lol')
console.log(g)