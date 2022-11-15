// 去抖:在一定时间内，如果没有再次触发这个函数，才去真正的去执行函数

const debouncing = (func, delay) => {
    let timer = null

    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(func, delay)
    }
}

// 节流:如果一个函数持续的，频繁地触发，在一定时间间隔内只允许执行一次
const throttling = (func, delay) => {
    let prev = Date.now()
    
    return function () {
        let now = Date.now()
        if (now - prev > delay) {
            func()
            prev = now
        }
    }
}