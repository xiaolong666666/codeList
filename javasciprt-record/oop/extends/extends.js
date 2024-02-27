function inheritPrototype(subType, superType) {
  subType.prototype = Object(superType.prototype)
  subType.prototype.constructor = subType
}

function Cars() {
  this.name = "Benz"
  this.color = ["white", "black"]
}

Cars.prototype.sayColor = function () {
  var outer = this
  return function () {
    return outer.color;
  }
}

function Car() {
  Cars.call(this);
  this.number = [321, 32]
}

inheritPrototype(Car, Cars)

Car.prototype.sayNumber = function () {
  var outer = this
  return function () {
    return function () {
      return outer.number[outer.number.length - 1]
    }
  }
}

var instance = new Car()
console.log(instance)
console.log(instance.sayNumber()()())