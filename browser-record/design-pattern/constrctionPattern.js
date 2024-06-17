// 结构型
// 功能：优化结构实现方式

// 适配器模式 - adapter
// 适配独立模块，保证模块间独立解耦且连接兼容

// sprint1 买了一个港行ps5，插座国标
(() => {
  class GHDevice {
    getPlugin() {
      return "港行圆柱插头";
    }
  }

  class Target {
    constructor() {
      this.plug = new GHDevice();
    }
    getPlugin() {
      return this.plug.getPlugin() + "+港行双圆柱转换器";
    }
  }

  const target = new Target();
  console.log(target.getPlugin());
})();

// 装饰器模式
// 动态地将责任能力附加到已有对象

// sprint2 设备升级
(() => {
  class Device {
    create() {
      return "device";
    }
  }

  class Phone {
    create() {
      return "iphone15";
    }
  }

  class Decorator {
    constructor(device) {
      this.device = device;
    }

    create() {
      return this.device.create();
    }

    update() {
      return this.create() + "Pro";
    }
  }

  const device = new Device();
  const newDevice = new Decorator(device);
  console.log(newDevice.update());
})();

// 代理模式
// 使用代理人替代原始对象

// sprint3 游戏防沉迷
(() => {
  class Game {
    play() {
      console.log("play");
    }
  }
  class Player {
    constructor(age) {
      this.age = age;
    }
  }

  class GameProxy {
    constructor(age) {
      this.player = new Player(age);
    }
    play() {
      return this.player.age < 16 ? "too young" : new Game().play();
    }
  }

  const gameProxy = new GameProxy(12);
  gameProxy.play();
})();

// 模式场景
// 保持模块独立同时兼容老项目和新项目的转换 - 适配器
// 可附着于多个组件之上，批量动态赋予功能时候 - 装饰器
// 将代理对象与调用对象分离，不直接调用目标，可在代理对象中拓展新功能 - 代理

// 实际应用
// 1. 筛选器、表格，需要做联动，但是筛选器数据不能直接传入表格，需要转换 => 模块独立、转换、老场景 => 适配器
// 2. 按钮、title、icon，三个组件同时具备远程拉取能力 => 多个不同主体、动态拓展 => 装饰器
// 3. ul 上有多个 li，每个 li 上的点击事件 => 利用冒泡，绑定在 ul => 代理
