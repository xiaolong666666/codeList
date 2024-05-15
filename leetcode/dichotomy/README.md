## 模版 O（long n）

```js
  function search(list, target) => {
    let low = 0;
    let high = list.length - 1; // 边界情况具体分析
    while (low <= high) { // 不使用 low < high 原因：如果 list 长度为偶数时，倒数第二步为 low === high
      let mid = low + ((high - low) >> 1) // 不使用 (low + high) / 2 原因：防止大数相加过界
      if (list[mid] === target) {
        return mid;
      } else if (list[mid] < target) {
        low = mid + 1;  // 不使用 low = mid 原因：可能造成死循环
      } else {
        low = mid - 1;  // 同上
      }
    }

    return -1;  // 如果找一个位置的话 return low 或 return high + 1
  }
```

### 二分场景

二分依赖的是顺序表，是数组，非链表

二分查找的一定是有序数组

数据量一般比较大
