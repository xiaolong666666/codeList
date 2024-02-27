class Father {
  constructor(name) {
    this.name = name
  }

  work() {
    console.log('work')
  }
}

class Son extends Father {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  work() {
    console.log('study')
    // 1
    super.work()
  }
}

const son = new Son('tom', 18)
console.log(son)
son.work()

// 子类和父类同名函数情况下，如何调用父类方法
// 1
// 2
  Son.prototype.__proto__.work()