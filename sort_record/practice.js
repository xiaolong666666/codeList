// 找出数组中出现次数超过一半的数字
// 测试用例
// console.log(findMoreThanHalf([0,1,2,2])) // -1
// console.log(findMoreThanHalf([0,1,2,2,2])) // 2

const findMoreThanHalf = (arr) => {
    const halfLength = arr.length / 2
    const map = new Map()
    let result = -1 
    for (let v of arr) {
        if (map.has(v)) {
            map.set(v, map.get(v)+1)
        } else {
            map.set(v, 1)
        }
    }
    for (let [k, v] of map.entries()) {
        if (v > halfLength) {
            result = k
            break;
        }
    }
    return result
}

// 返回最接近输入值的数字，如果有多个，返回最大的那个
const findNext = (n, arr) => {
    arr.sort((a, b) => a - b)
    let targetNum = arr[0]
    for (let v of arr) {
        if (Math.abs(v - n) <=
            Math.abs(targetNum - n)) {
            targetNum = v
        }
    }
    return targetNum
}
const arr = [1, 5, 9, 15, 34, 28, 55, 78, 99];
const result = findNext(31, arr)
console.log({ result })