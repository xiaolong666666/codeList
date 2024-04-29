// 随机生成16进制代码(生成随机颜色)
/* (() => {    // 0x 表示16进制    ffffff 表示白色
    const res = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
    console.log('随机生成16进制代码', res)
})() */

// 打印1到100，遇到数字为3的倍数的时候，打印“Fizz”替代数字，5的倍数用“Buzz”代替，既是3的倍数又是5的倍数打印“FizzBuzz”。
/* (() => {
for(i=0;++i<101;console.log(i%5?f||i:f+'Buzz'))f=i%3?'':'Fizz'

var y=[];
for(i=1;i<101;i++){
    if(!(i%3)&&!(i%5)) y.push('FizzBuzz')
    else if(!(i%3)) y.push('Fizz')
    else if(!(i%5)) y.push('Buzz')
    else y.push(i)
}
})() */

// 获取URL查询参数
/* (() => {
    const q = {}
    const defaultSearch = location.search || '?foo=bar&baz=bing' 
    defaultSearch.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
    console.log(q)
})() */

// 判断数组&对象
/* (() => {
    const isArray = (o) => {
        Object.prototype.toString.call(o) === '[object Array]';
        Array.isArray(o)
        o instanceof Array
    }
    const isObject = (o) => {
        Object.prototype.toString.call(o) === '[object Object]';
        typeof o === 'object' && !(o instanceof Array)
    }
})() */

// mapping 双向绑定
/* (() => {
    const createMapping = (m = {}) => {
        for (let i = 0; i < 26; i++) {
            let char = String.fromCharCode(i + 65)  // 通过数字 => 字符     字符 => 数字（char.charCodeAt()）
            console.log(char)
            m[m[char] = i] = char
        }
        return m
    }
    const mapping = createMapping()
    console.log(mapping)
})() */

// LRU缓存  vue keep-alive
/* (() => {
  class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
    }

    put(key, value) {
      if (this.cache.size >= this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
        this.cache.set(key, value);
      } else {
        this.cache.set(key, value);
      }
    }

    get(key) {
      if (this.cache.has(key)) {
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
      }

      return -1;
    }
  }

  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  console.log(cache.get(1));
  cache.put(3, 3);
  console.log(cache.get(3));
})(); */

// 类数组转数组
/* (() => {
  function test() {
    console.log([...arguments]);
    console.log(Array.from(arguments));
    console.log(Array.apply(null, arguments));
    console.log(Array.prototype.slice.call(arguments));
    console.log(Array.prototype.concat.apply([], arguments));
  }
  test(1, 2, 3, 4, 5);
})(); */

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

// n 个小朋友围成一个圈，数到 idx 的人退出，最后剩下第几个小朋友
function xlFriendCircle(idx, n) {
  const arr = [...new Array(n).keys()].map((i) => ({ id: i + 1 }));
  let current = 0;
  while (arr.length > 1) {
    for (let v of arr) {
      current++;
      v["number"] = current % idx || idx;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["number"] === idx) {
        arr.splice(i, 1);
        i--;
      }
    }
  }
  return arr[0]["id"];
}

// 斐波那契数列
function xlFibonacci(n) {
  function* gen() {
    let i = 1;
    let j = 1;
    while (true) {
      yield i;
      [i, j] = [j, i + j];
    }
  }

  let result = [];
  let count = 0;
  for (let v of gen()) {
    count++;
    result.push(v);
    if (count === n) break;
  }

  return result;
}

// 有序二维数组中查找是否有 target
function xlFindIn2DArray(arr, target) {
  if (arr.length === 0) return false;
  if (arr[0].length === 0) return false;

  let row = 0;
  let col = arr[0].length - 1;

  while (row < arr.length && col >= 0) {
    if (arr[row][col] === target) {
      return true;
    } else if (arr[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}

// 异步加载图片
function xlLoadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// 最长不重复字符串
function xlLongestNoRepeatString(str) {
  const map = new Map();
  let start = 0;
  let end = 0;
  let maxLen = 0;

  while (end < str.length) {
    if (map.has(str[end])) {
      start = Math.max(start, map.get(str[end]) + 1);
    }
    map.set(str[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
    end++;
  }

  return maxLen;
}

// 判断是否存在循环引用
function xlIsCircularReference(obj) {
  const map = new WeakMap();

  function isCircularReference(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    if (map.has(obj)) return true;
    map.set(obj, true);
    for (let key in obj) {
      if (isCircularReference(obj[key])) return true;
    }
    map.delete(obj);
    return false;
  }

  return isCircularReference(obj);
}
