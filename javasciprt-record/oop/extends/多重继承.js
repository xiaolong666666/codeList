// 多重继承
function Father(lastName) {
  this.lastName = lastName
}

Father.prototype.getWork = function () {
  console.log('work')
}

function Mother(firstName) {
  this.firstName = firstName
}

Mother.prototype.getHousehold = function () {
  console.log('household')
}

function Son(lastName, firstName) {
  Father.call(this, lastName)
  Mother.call(this, firstName)
}

Son.prototype = Object.create(Object.assign({}, Father.prototype, Mother.prototype))
Son.prototype.constructor = Son

const son = new Son('李', '云龙')
son.name = `${son.lastName}${son.firstName}`
console.log(son)