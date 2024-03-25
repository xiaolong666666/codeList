// 代理-容错-没有属性值不报错
/* (() => {
    const target = {}
    const handler = {
        get(target, property) {
            target[property] = property in target ? target[property] : {}
            if (typeof target[property] === 'object') {
                return new Proxy(target[property], handler)
            }
            return target[property]
        }
    }
    const proxyTarget = new Proxy(target, handler)
    console.log(proxyTarget, proxyTarget.x.y)
    console.log(target, target.x.y)
})() */

// 代理-http请求封装📦
/* (() => {
    const handler = {
        get(target, property) {
            if (!target.init) {
                ['GET', 'POST'].forEach(method => {
                    target[method] = (url, params) => {
                        return fetch(url, {
                            method,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(params),
                            mode: 'cors',
                            cache: 'no-cache',
                            credentials:'same-origin',
                            redirect: 'follow',
                            referrerPolicy: 'no-referrer',
                            ...params
                        })
                    }
                })
            }
            return target[property]
        }
    }
    const myFetch = new Proxy({}, handler)
    myFetch.GET('xxx')
    myFetch.POST('xxx', { name: 'xl' })
})() */

// 代理-属性不可为false
/* (() => {
    const assert = new Proxy(
        {},
        {
            set(target, key, value) {
                if (!value) return console.error({[key]: value});
                target[key] = value
                return value
            }
        }
    )
    assert.a = 1
    assert.flag = false
    console.log(assert)
})() */

// 代理-函数调用
/* (() => {
    function fn() {}
    const fnProxy = new Proxy(fn, {
        apply(target, thisArg, argumentsList) {
            console.log(target, thisArg, argumentsList)
            return target.apply(thisArg, argumentsList)
        }
    })
    const o = {
        f: fnProxy
    }
    fn(0)
    fnProxy(1, 2, 3)
    o.f(4)
})() */