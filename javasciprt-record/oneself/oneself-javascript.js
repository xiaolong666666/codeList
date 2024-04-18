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
  let __proto__ = obj.__proto__;
  let prototype = constructor.prototype;

  while (__proto__) {
    if (__proto__ === prototype) {
      return true;
    }
    __proto__ = __proto__.__proto__;
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

// 千分位逗号分隔
function xlThousandsSeparator(num) {
  // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let s = num.toString();
  let fractionalPartIdx = s.indexOf(".");
  let fractionalPart = "";
  if (fractionalPartIdx > 0) {
    fractionalPart = s.slice(fractionalPartIdx);
    s = s.slice(0, fractionalPartIdx);
  }
  let integer = "";
  for (let i = 0; i < s.length; i++) {
    integer = s[s.length - i - 1] + `${!(i % 3) && i ? "," : ""}` + integer;
  }
  return `${integer}${fractionalPart}`;
}

// 大数 +
function xlBigAdd(a, b) {
  a = a.toString().split("");
  b = b.toString().split("");
  let temp = 0;
  let result = "";

  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    result = (temp % 10) + result;
    temp = ~~(temp / 10);
  }

  return result;
}

// 大数 *
function xlBigMul(a, b) {
  a = a.toString().split("");
  b = b.toString().split("");
  let depthList = [];
  for (let i = 0; i < a.length; i++) {
    let temp = 0;
    let base = ~~a[a.length - i - 1];
    let result = "0".repeat(i);
    for (let j = 0; j < b.length; j++) {
      temp += base * ~~b[b.length - j - 1];
      result = (temp % 10) + result;
      temp = ~~(temp / 10);
    }
    if (temp) result = temp + result;
    depthList.push(result);
  }
  return depthList.reduce((a, b) => xlBigAdd(a, b), "");
}
