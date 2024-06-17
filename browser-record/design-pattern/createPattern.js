// 元素创建型
// 功能：创建元素
// 目的：规范创建步骤

// 工厂模式
// 隐藏创建过程、暴露共同接口

// sprint1 游戏商城里下载、初始化游戏，并且可以运行游戏
(() => {
  class Store {
    create(name) {
      return new GameFactory(name);
    }
  }

  class GameFactory {
    constructor(name) {
      this.name = name;
    }
    init() {
      console.log("init");
    }
    run() {
      console.log("run");
    }
  }

  const lol = new Store("lol");
  lol.init();
  lol.run();

  const wukong = new GameFactory("wukong");
  wukong.init();
  wukong.run();
})();

// 建造者模式
// 拆分 简单模块、独立运行 => 注重过程和搭配

// sprint2 优惠套餐单元，商品 + 皮肤 进行组合打包售卖
(() => {
  class Product {
    constructor(name) {
      this.name = name;
    }
    init() {
      console.log("Product init");
      return "Product init";
    }
  }

  class Skin {
    constructor(name) {
      this.name = name;
    }
    init() {
      console.log("Product init");
      return "Product init";
    }
  }

  class PackageBuilder {
    constructor(name) {
      this.product = new Product(name);
      this.skin = new Skin(name);
    }
    getPackage() {
      return this.product.init() + this.skin.init();
    }
  }

  class Store {
    constructor(name) {
      this.package = "";
    }
    create(name) {
      this.package = new PackageBuilder(name);
    }
    getPackage() {
      return this.package.getPackage();
    }
  }

  const store = new Store();
  store.create("lol");
  console.log(store.getPackage());
})();

// 单例模式
// 全局只有一个实例
(() => {
  class PlayStation {
    state = "off";
    static instance = null;
    constructor() {}
    static getInstance() {
      if (!PlayStation.instance) {
        PlayStation.instance = new PlayStation();
      }
      return PlayStation.instance;
    }
    start() {
      if (this.state === "on") {
        console.log("目前处于开机状态");
        return;
      }
      this.state = "on";
    }
    shutdown() {
      if (this.state === "off") {
        console.log("目前处于关机状态");
        return;
      }
      this.state = "off";
    }
  }
  const ps1 = PlayStation.getInstance();
  const ps2 = PlayStation.getInstance();
})();

// 模式场景
// 1. 批量生产同类型应用来满足频繁使用同一类商品的需求 - 工厂
// 2. 模块化组合或拆分若干个模块时，同时保证模块间独立解耦分工 - 建造者
// 3. 全局只需要一个实例 - 单例

// 实际应用
// Button Product：批量生产按钮 => 生产多个本质相同，利用传参区分不同属性的元素 => 工厂
// 页头组件 Header：包含了 title button breadcrumb => 生产不同类型的元素并且按照需要组装起来 => 建造者
// 全局应用 router：全局只需要一个实例 => 单例
