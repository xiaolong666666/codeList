const cloneShallow = (obj) => {
    // return Object.assign({}, obj)   // Tips: 当 obj 只有一层时是深拷贝
    return { ...obj }
}

// JSON.parse(JSON.stringify(obj)) 也可以实现深拷贝，不过不能拷贝函数
// const cloneDeep = (obj) => {
//     const result = JSON.parse(JSON.stringify(obj))
//     for (let i in obj) {
//         if (x[i] === undefined || typeof x[i] === 'function') {
//             result[i] = obj[i]
//         }
//     }
// }

const cloneDeep = (obj) => {
    if (typeof obj !== 'object') return obj
    const target = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
        target[i] = cloneDeep(obj[i])
    }
    return target
}


let obj = {
    name: 'xl',
    age: 18,
    eat: () => console.log('馒头'),
    sleep: ['nooning', 'evening'],
    go: {
        email: 'xxx.163.com'
    }
}

const assignment_data = obj
const shallow_data = cloneShallow(obj)
const deep_data = cloneDeep(obj)
console.log({ obj, shallow_data, deep_data })