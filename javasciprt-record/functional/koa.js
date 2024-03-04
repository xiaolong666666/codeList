// 洋葱模型
// 一层一层去调用，然后再依次返回

function one(next) {
    console.log('one next', next)
    return function(action) {
        console.log('one start', action)
        action = action * 2
        next(action)
        console.log('one end')
    }
}

function two(next) {
    console.log('two next', next)
    return function(action) {
        console.log('two start', action)
        action = action + 20
        next(action)
        console.log('two end')
    }
}

function three(next) {
    console.log('three next', next)
    return function(action) {
        console.log('three start', action)
        action = action / 4
        next(action)
        console.log('three end')
    }
}

const compose = (list) =>
    list.reduce(
        (a, b) =>
        (...args) => a(b(...args))
    )

const functionList = [one, two, three]

const composeFunction = compose(functionList)(console.log)

// 解析
// let step1 = (...args) => one(two(...args))
// let step2 = (...args) => step1(three(...args))
// let step3 = (...args) => step2(...args)
// console.log(step3(console.log)(6))

console.log(composeFunction(6))