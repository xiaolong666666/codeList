// 利用 Set 中的值是唯一
const setRemoveRepeat = (arr) => {
  return [...new Set(arr)];
  // return Array.from(new Set(arr))
};

// 利用 indexOf 找到第一项符合的下标
const indexOfRemoveRepeat = (arr) => {
  let result = [];
  for (let i in arr) {
    if (arr.indexOf(arr[i]) == i) {
      result.push(arr[i]);
    }
  }
  return result;
};

// 利用 includes 去重
const includesRemoveRepeat = (arr) => {
  let result = [];
  for (let v of arr) {
    !result.includes(v) && result.push(v);
    // if (result.indexOf(v) == -1) {
    //     result.push(v)
    // }
  }
  return result;
};

// 利用 filter 去重
const filterRemoveRepeat = (arr) => {
  let map = {};
  return arr.filter((v) =>
    map.hasOwnProperty(`${typeof v}${v}`)
      ? false
      : (map[`${typeof v}${v}`] = true)
  );
};

// 会改变原数组（不推荐）
// 利用 sort 去重
const sortRemoveRepeat = (arr) => {
  arr.sort((a, b) => a - b);
  let result = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== result[result.length - 1]) {
      result.push(arr[i]);
    }
  }
  return result;
};

// 利用 splice 去重
const spliceRemoveRepeat = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--; // splice 后 arr 会删除一个元素 j-- 才不会漏掉元素
      }
    }
  }
  return arr;
};
