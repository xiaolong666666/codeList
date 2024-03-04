### Lodash
    
```js
    // 函数组合使用
    const fp = require('lodash/fp')

    const list = [1, 2, 3, 4]

    const one = fp.map(v => v + 1)
    const two = fp.filter(v => v > 2)
    const three = fp.flatMap(v => [v * 2, v * 3])
    const four = fp.groupBy(v => i % 2) // 分类

    
    const fpFunc = fp.flow(one, two, three, four)

    fpFunc(arr)
```

### rxjs

```js
    // 函数组合使用
    const { from, map, filter, mergeMap, groupBy } from 'rxjs'

    const list = [1, 2, 3, 4]

    const origin = from(list)

    const one = map(v => v + 1)
    const two = filter(v => v > 2)
    const three = mergeMap(v => [v * 2, v * 3])
    const four = groupBy(v => i % 2) // 分类

    origin.pipe(
        one,
        two,
        three,
        four
    ).subscribe(v => console.log(v))
```