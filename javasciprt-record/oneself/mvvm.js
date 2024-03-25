class Vue {
  constructor(options) {
    const data = options.data || {};
    this.$data = data;

    // 代理 $data 数据到 this
    _proxy(this, "$data", data);

    // 数据劫持 => init
    observe(data);

    new Watcher(
      this,
      () => `<div>${data.name}</div>`,
      (v) => console.log(`watch cb: ${v}`)
    );
  }
}

// 代理
const _proxy = (vm, sourceKey, data) => {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key];
      },
      set(v) {
        vm[sourceKey][key] = v;
      },
    });
  });
};

// 数据监听器
class Observer {
  constructor(data) {
    this.run(data);
  }

  run(data) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key);
    });
  }
}

// 依赖收集器
class Dep {
  static target = null;
  static uid = 0;

  constructor() {
    this.id = Dep.uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }

  removeSub(sub) {
    const subIdx = this.subs.indexOf(sub);
    this.subs.splice(subIdx, 1);
  }
}

// 观察器
class Watcher {
  constructor(vm, render, cb) {
    this.vm = vm;
    this.render = render;
    this.cb = cb;

    this.deps = [];
    this.depIds = new Set();
    this.newDeps = [];
    this.newDepIds = new Set();

    this.value = this.get();
    this.cb(this.value);
  }

  get() {
    Dep.target = this;

    this.newDeps = [];
    this.newDepIds = new Set();

    const value = this.render();

    Dep.target = null;

    this.deps.forEach((oldDep) => {
      const notExistInNewDeps = !this.depIds.has(oldDep.id);
      if (notExistInNewDeps) {
        oldDep.removeSub(this);
      }
    });

    this.deps = this.newDeps;
    this.depIds = this.newDepIds;

    return value;
  }

  addDep(dep) {
    const depId = dep.id;
    if (!this.newDepIds.has(depId)) {
      this.newDepIds.add(depId);
      this.newDeps.push(dep);
    }
    if (!this.depIds.has(depId)) {
      dep.addSub(this);
    }
  }

  update() {
    this.value = this.render();
    this.cb(this.value);
  }
}

const observe = (data) => {
  const ob = new Observer(data);
};

const defineReactive = (obj, key) => {
  const dep = new Dep();
  let v = obj[key];

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log("依赖收集");
      dep.depend();
      return v;
    },
    set(newVal) {
      v = newVal;
      console.log("派发更新");
      dep.notify();
    },
  });
};

const vue = new Vue({
  data: {
    name: "xl",
    age: 18,
  },
});
