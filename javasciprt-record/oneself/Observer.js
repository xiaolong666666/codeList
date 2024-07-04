// 发布订阅模式
// 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

class Observer {
  constructor() {
    this.message = {};
  }

  on(messageName, fn) {
    if (!this.message[messageName]) {
      this.message[messageName] = [];
    }
    this.message[messageName].push(fn);
  }

  once(messageName, fn) {
    const onceFn = (...args) => {
      fn(...args);
      this.off(messageName, onceFn);
    };
    onceFn.original = fn; //! 考虑 line 59 && line 61 case
    this.on(messageName, onceFn);
  }

  off(messageName, fn) {
    if (!this.message[messageName]) return;
    if (!fn) {
      delete this.message[messageName];
      return;
    }
    this.message[messageName] = this.message[messageName].filter(
      (message) => message !== fn && message.original !== fn
    );
  }

  emit(messageName) {
    if (!this.message[messageName]) {
      throw new Error(`消息队列没有${messageName}`);
    }
    this.message[messageName].forEach((message) => {
      message();
    });
  }
}

function handleA() {
  console.log("handleA");
}

function handleB() {
  console.log("handleB");
}

const person1 = new Observer();
person1.on("liam", handleA);
person1.on("liam", () => {
  console.log("触发回调1");
});
person1.once("liam", handleB);
person1.off("liam", handleA);
person1.off("liam", handleB);

person1.emit("liam");
person1.emit("liam");
console.log(person1);
