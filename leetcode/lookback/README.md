## 模版

```js
  function search(list, target) => {
    let res = [];
    let path = [];

    function backtrack(path) {
      if (condition) {
        res.push([...path]);
      }

      for (let i = 0; i < list.length; i++) {
        path.push(i);
        backtrack(path);
        path.pop();
      }
    }

    backtrack(path);

    return res;
  }
```

### 回溯场景

大部分情况下，解决的都是一个广义搜索的问题（从一组可能满足需求的解中，找出一部分正解）

组合：N 个数，找出 K 个数的集合

排列：N 个数，有几种排列方式

棋盘：N 皇后，数独
