const privateMap = new WeakMap()    // 2-2

class Parent {
    constructor(name, age) {
        privateMap.set(this, { name })
        this.getPrivateAge = function() {   // 2-1
            return age
        }
    }
    getName() {
        alert(this.name)
    }

    get name() {
        return privateMap.get(this).name
    }

    // set name(v) {}  // 只读变量 readonly     // 1-1
}

const f = new Parent('father', 42)
const m = new Parent('mother', 43)

// js 如何建立只读变量
// 1-1  set 不处理

// js 如何创建私有变量
// 2-1 闭包 每创建一个实例都会新创建一个函数，会占用额外 memory
// 2-2 class 外存储

// 封装核心 => 适配器
// 底层代码核心 core => 封装 => 客户
class Utils {
    static count = 0

    constructor(core, info) {
        privateMap.set(this, { core })
        this._name = info.name
        Utils.count++
    }

    get name() {
        return  this._name ?? privateMap.get(this).core.name
    }

    set name(v) {
        this._name = v
    }

    static getRoleNumber() {
        return Utils.count
    }
}

function createUser (info = {}) {
    const basicCore = {
        business: '七龙珠',
        region: '贝吉塔行星',
        name: '卡卡罗特',
    }
    return new Utils(basicCore, info)
}

const user1 = createUser({ region: '地球', name: '孙悟空' })
const user2 = createUser()