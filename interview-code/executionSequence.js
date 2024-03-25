/* // 执行顺序分析start
async function async1() {
  console.log('1');
  await async2();
  console.log('2');
}
async function async2() {
  console.log('3');
}
console.log('4');


setTimeout(function () {
  console.log('5');
}, 0)

async1();

new Promise(function (resolve) {
  console.log('6');
  resolve();
}).then(function () {
  console.log('7');
}).then(function () {
  console.log('8')
});
console.log('9');

// 4  1  3  6  9  2  7  8  5
// 执行顺序分析end */

/* // 实例化构造器分析start
function Foo() {
  getName = function () {
    console.log(1)
  }
  console.log('this is ' + this)
  return this
}

Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}
function getName () {
  console.log(5)
}

Foo.getName();  // 2
getName();  // 4
Foo().getName();    // 1
getName();  // 1
new Foo.getName();  //  2   有调用方法的从左往右
new Foo().getName();    // 3  new Foo() => .getName()
new new Foo().getName();    // 3  new Foo() => .getName() => new ...
// 实例化构造器分析end */

// 事件循环分析 1
/* (() => {
  Promise.resolve()
    .then(() => {
      console.log(0);
      return Promise.resolve("!!!"); // Promise.resolve('!!!') 相当于一个微任务
      // Promise.resolve()
      //   .then((r = '!!!') => r)
    })
    .then((res) => {
      console.log(res);
    });

  Promise.resolve()
    .then(() => {
      console.log(1);
    })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });

  // 微任务 = [
  //   Promise.resolve("!!!")
  //     .then((r = "!!!") => r)
  //     .then((res) => {
  //       console.log(res);
  //     }),
  //   (() => {
  //     console.log(2);
  //   })
  //     .then(() => {
  //       console.log(3);
  //     })
  //     .then(() => {
  //       console.log(4);
  //     }),
  // ];
  // 宏任务 = [];
  // 执行栈 = [0, 1];
})(); */

// 事件循环分析 2
/* (() => {
  const v = new Promise((resolve, reject) => {
    console.log(0)
    resolve('!!!')
  })

  // Promise.resolve(v).then((res) => {  // 1 立即执行
  //   console.log(res)
  // })

  new Promise((resolve, reject) => { // 2 类似（事件循环分析 1）
    resolve(v)
  }).then((res) => {
    console.log(res)
  })

  new Promise((resolve, reject) => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });

  // 微任务 = [
  //   Promise.resolve("!!!")
  //     .then((r = "!!!") => r)
  //     .then((res) => {
  //       console.log(res);
  //     }),
  //   (() => {
  //     console.log(2);
  //   })
  //     .then(() => {
  //       console.log(3);
  //     })
  //     .then(() => {
  //       console.log(4);
  //     }),
  // ];
  // 宏任务 = [];
  // 1 执行栈 = [0, 1, '!!!', 2, 3, 4];
  // 2 执行栈 = [0, 1, 2, 3, '!!!', 4];
})(); */

