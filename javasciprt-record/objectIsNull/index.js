// 利用 for in 
// let isNullObject = (obj) => {
//     for (let i in obj) {
//         return false
//     }
//     return true
// }

// 利用 JSON.stringify
// let isNullObject = (obj) =>
//     JSON.stringify(obj) === '{}'

// 利用 Object.keys
let isNullObject = (obj) => 
    Object.keys(obj).length === 0

let obj = {}

const result = isNullObject(obj)
console.log({ result })