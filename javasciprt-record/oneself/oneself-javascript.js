// Object.create
function xlObjectCreate(obj) {
  // function A() {}
  // A.prototype = obj;
  // return new A();

  const temp = {};
  temp.__proto__ = obj;
  return temp;
}

// instanceof
function xlInstanceof(obj, constructor) {
  let __proto__ = obj.__proto__; // Object.getPrototypeOf(obj)
  let prototype = constructor.prototype;

  while (__proto__) {
    if (__proto__ === prototype) {
      return true;
    }
    __proto__ = __proto__.__proto__; // Object.getPrototypeOf(__proto__)
  }
  return false;
}

// new
function xlNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  // 如果构造函数中有对象返回值需要返回
  return res instanceof Object ? res : obj;
}

// 获取准确类型
function xlTypeOf(obj) {
  return Object.prototype.toString
    .call(obj)
    .match(/\[object (\w+)\]/)[1]
    .toLowerCase();
}

// Object.assign
function xlObjectAssign(target, ...args) {
  if (!target instanceof Object) target = Object(target);

  args.forEach((source) => {
    Object.keys(source).forEach((key) => {
      target[key] = source[key];
    });
  });

  return target;
}

// 日期格式处理
function xlDateFormat(date, format) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const result = format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hour)
    .replace("mm", minute)
    .replace("ss", second);

  return result;
}

// 数组随机洗牌
function xlArrayShuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

// 数组扁平化
function xlArrayFlatten(arr) {
  return arr.reduce(
    (prev, current) =>
      prev.concat(Array.isArray(current) ? xlArrayFlatten(current) : current),
    []
  );
}

// 对象扁平化
function xlObjectFlatten(obj) {
  if (typeof obj !== "object" || obj === null) return;
  const result = {};
  const dfs = (current, prefix = "") => {
    if (typeof current === "object" && current !== null) {
      for (let key in current) {
        if (current.hasOwnProperty(key)) {
          dfs(current[key], `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    } else {
      result[prefix] = current;
    }
  };
  dfs(obj);

  return result;
}

// Array.prototype.flat
Array.prototype.xlFlat = function (depth = 1) {
  if (!depth) return this;
  const result = [];

  for (let v of this) {
    if (Array.isArray(v)) {
      result.push(...v.xlFlat(depth - 1));
    } else {
      result.push(v);
    }
  }

  return result;
};

// Array.prototype.push
Array.prototype.xlPush = function (...args) {
  args.forEach((v) => {
    this[this.length] = v;
  });
  return this.length;
};

// Array.prototype.map
Array.prototype.xlMap = function (fn) {
  const result = [];

  for (let idx in this) {
    if (this.hasOwnProperty(idx)) {
      result.push(fn(this[idx], idx, this));
    }
  }
  return result;
};

// Array.prototype.filter
Array.prototype.xlFilter = function (fn) {
  const result = [];

  for (let idx in this) {
    if (this.hasOwnProperty(idx)) {
      const flag = fn(this[idx], idx, this);
      flag && result.push(this[idx]);
    }
  }
  return result;
};
