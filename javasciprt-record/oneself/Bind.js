Function.prototype.myCall = function () {
    const args = Array.from(arguments)
    let thisArgs = args.shift() ?? window
    thisArgs = Object(thisArgs)

    // 防止覆盖掉原有属性
    const key = Symbol()    

    // 将this绑定在 __proto__ 上防止在 Function 打印 this 时会出现多余的属性
    thisArgs.__proto__[key] = this  
    const result = thisArgs[key](...args)
    delete thisArgs.__proto__[key]
    return result
}

Function.prototype.myApply = function () {
    let thisArgs = arguments[0] ?? window
    thisArgs = Object(thisArgs)
    let args = arguments[1] || []

    // 防止覆盖掉原有属性
    const key = Symbol()

    // 将this绑定在 __proto__ 上防止在 Function 打印 this 时会出现多余的属性
    thisArgs.__proto__[key] = this
    const result = thisArgs[key](...args)
    delete thisArgs.__proto__[key]
    return result
}

Function.prototype.myBind = function () {
    let args = Array.from(arguments)
    let thisArgs = args.shift() || window
    let thisFunc = this

    // 因为需要支持构造函数，所以不能使用匿名函数
    let bound = function () {
        let newArgs = args.concat(Array.from(arguments))

        // 判断是否是构造函数
        thisArgs = this instanceof bound ? this : thisArgs
        return thisFunc.apply(thisArgs, newArgs)        
    }

    // Object.create 拷贝原型对象
    bound.prototype = Object.create(this.prototype)

    return bound
}