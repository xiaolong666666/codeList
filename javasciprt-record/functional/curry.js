// 柯里化
// 为实现多参数函数提供一个递归降解思路

const add = (...list) => list?.reduce((a, b) => a + b, 0)

const curry = (fn, ...args) => {
    const inner = (...arg) =>
        curry(fn, ...args, ...arg)

    inner.toString = () => fn(...args)

    return inner
}

const curryAdd = curry(add)

console.log(curryAdd(1)(2)(3).toString())