// 依赖倒置原则【Dependence Inversion Principle】
// 目标🎯：面向抽象进行 coding，而不是面向实现进行 coding，特别是内部的实现变量或方法

// sprint 1 分析功能
class Store {
  constructor() {
    this.share = new Share();
  }
}

class Share {
  shareTo() {
    // 分享到不同的平台
  }
}

const store1 = new Store();
store1.share.shareTo();

// sprint 2
class Store {
  constructor() {
    this.share = new Share();
    this.rate = new Rate(); // 底层随着上层逻辑的增加而增加逻辑 ❌
  }
}

class Share {
  shareTo() {
    // 分享到不同的平台
  }
}

class Rate {
  stars(stars) {
    // 打分机制
  }
}

const store2 = new Store();
store2.rate.stars(5);

// 重构
// 目标🎯：动态挂载 => 暴露挂载
class Store {
  // 当前的模块名单
  static modules = new Map();
  // 支持外部进行注册
  static inject = (module) => Store.modules.set(module.constuctor.name, module);
  constructor() {
    for (let module of Store.modules.values()) {
      // 每个模块进行初始化
      module.init(this);
    }
  }
}

class Share {
  init(store) {
    store.share = this;
  }
  shareTo() {
    // 分享到不同的平台
  }
}

class Rate {
  init(store) {
    store.rate = this;
  }
  stars(stars) {
    // 打分机制
  }
}

// 依此完成注册
const share = new Share();
Store.inject(share);
const rate = new Rate();
Store.inject(rate);

const store = new Store();
store.share.shareTo();
store.rate.stars(5);
