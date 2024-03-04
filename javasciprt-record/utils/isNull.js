// 判断一个对象是否为空

// 利用 for in 
// let isNull = (obj) => {
//     for (let i in obj) {
//         return false
//     }
//     return true
// }

// 利用 JSON.stringify
// let isNull = (obj) =>
//     JSON.stringify(obj) === '{}'

// 利用 Object.keys
let isNull = (obj) => 
    Object.keys(obj).length === 0

let obj = {}

const result = isNull(obj)
console.log({ result })