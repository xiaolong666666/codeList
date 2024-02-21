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
    let args = [...arguments]
    let thisArgs = args.shift() || window
    let thisFunc = this

    // 因为需要支持构造函数，所以不能使用匿名函数
    let bound = function () {
        let newArgs = [...args, ...arguments]
        const isStructureFunc = this instanceof bound
        // 判断是否是构造函数
        thisArgs = isStructureFunc ? Object.create(thisFunc.prototype) : thisArgs
        thisFunc.apply(thisArgs, newArgs)
        if (isStructureFunc) return thisArgs
    }

    // Object.create 拷贝原型对象
    bound.prototype = Object.create(thisFunc.prototype)

    return bound
}

Function.prototype.newBind = function () {
    const _this = this
    const args = Array.prototype.slice.call(arguments)
    const newThis = args.shift()

    return function () {
        return _this.newApply(newThis, args)
    }
}

Function.prototype.newApply = function (context) {
    if (typeof this !== 'function') {
        throw new Error('type error')
    }
    context = context || window
    context.fn = this
    const result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
    delete context.fn

    return result    
}

Function.prototype.newCall = function (context) {
    if (typeof this !== 'function') {
        throw new Error('type error')
    }
    context = context || window
    context.fn = this
    const args = Array.from(arguments).slice(1)
    const result = arguments[1] ? context.fn(...args) : context.fn()
    delete context.fn

    return result
}