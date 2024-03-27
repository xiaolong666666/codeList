Function.prototype.myCall = function () {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  const args = Array.from(arguments);
  let context = args.shift() ?? window;
  context = Object(context);

  // 防止覆盖掉原有属性
  const key = Symbol();

  // 将this绑定在 __proto__ 上防止在 Function 打印 this 时会出现多余的属性
  context.__proto__[key] = this;
  const result = args?.length ? context[key](...args) : context[key]();
  delete context.__proto__[key];

  return result;
};

Function.prototype.myApply = function () {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  const args = [...arguments];
  let context = args.shift() ?? window;
  context = Object(context);

  // 防止覆盖掉原有属性
  const key = Symbol();

  // 将this绑定在 __proto__ 上防止在 Function 打印 this 时会出现多余的属性
  context.__proto__[key] = this;
  const result = args[1]?.length ? context[key](...args[1]) : context[key]();
  delete context.__proto__[key];

  return result;
};

Function.prototype.myBind = function () {
  let args = Array.prototype.slice.call(arguments);
  let context = args.shift() ?? window;
  context = Object(context);
  let thisFunc = this;

  // 因为需要支持构造函数，所以不能使用匿名函数
  let bound = function () {
    // 判断是否是构造函数
    const isStructureFunc = this instanceof bound;
    context = isStructureFunc ? Object.create(thisFunc.prototype) : context;

    const result = thisFunc.myApply(context, [...args, ...arguments]);
    if (result instanceof Object) return result;
    if (isStructureFunc) return context;
  };

  // Object.create 拷贝原型对象
  bound.prototype = Object.create(thisFunc.prototype);

  return bound;
};

function A(info = {}) {
  console.log(this);
  Object.keys(info).forEach((key) => {
    this[key] = info[key];
  });
}

const info = { name: "jarry", age: 18, sex: "gril" };
const a = new A(info);
const v = A.bind({ v: "vvv" });
const v1 = v(info);
const v2 = new v(info);
console.log({ v1, v2 });
console.log("---");
const vv = A.myBind({ v: "vvv" });
const vv1 = vv(info);
const vv2 = new vv(info);
console.log({ vv1, vv2 });
