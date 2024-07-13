// 洋葱模型
// 一层一层去调用，然后再依次返回

function one(next) {
  console.log("one next", next);
  return function (action) {
    console.log("one start", action);
    action = action * 2;
    next(action);
    console.log("one end");
  };
}

function two(next) {
  console.log("two next", next);
  return function (action) {
    console.log("two start", action);
    action = action + 20;
    next(action);
    console.log("two end");
  };
}

function three(next) {
  console.log("three next", next);
  return function (action) {
    console.log("three start", action);
    action = action / 4;
    next(action);
    console.log("three end");
  };
}

const compose = (list) =>
  list.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );

const functionList = [one, two, three];

// const composeFunction = compose(functionList)(console.log);

// 解析
// let step1 = (...args) => one(two(...args))
// let step2 = (...args) => step1(three(...args))
// let step3 = (...args) => step2(...args)
// console.log(step3(console.log)(6))

// console.log(composeFunction(6));

// Koa
class Koa {
  constructor() {
    this.ctx = { req: {}, res: {} };
    this.queue = [];
  }
  // use(callback) {
  //   this.queue.push((next) => () => callback(this, next));
  // }
  // run() {
  //   this.queue.reduce(
  //     (pre, current) =>
  //       (...args) =>
  //         pre(current(...args))
  //   )(console.log)();
  // }

  use(callback) {
    this.queue.push(callback);
  }

  compose(middleware) {
    if (!Array.isArray(middleware))
      throw new TypeError("Middleware stack must be an array!");
    for (const fn of middleware) {
      if (typeof fn !== "function")
        throw new TypeError("Middleware must be composed of functions!");
    }

    return function (context, next) {
      let index = -1;
      return dispatch(0);
      function dispatch(i) {
        if (i <= index)
          return Promise.reject(new Error("next() called multiple times"));
        index = i;
        let fn = middleware[i];
        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    };
  }

  run() {
    this.compose(this.queue)(this.ctx);
  }
}

const koa = new Koa();

koa.use((ctx, next) => {
  console.log("start 1", ctx, next);
  next();
  console.log("end 1");
});

koa.use((ctx, next) => {
  console.log("start 2", ctx, next);
  next();
  console.log("end 2");
});

koa.use((ctx, next) => {
  console.log("start 3", ctx, next);
  next();
  console.log("end 3");
});

koa.run();
