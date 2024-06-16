// 接口隔离原则【Interface Segregation Principle】
// 目标🎯：多个专业的接口要比单个的胖接口好用

// sprint 实现中台来快速迭代游戏
class Game {
  constructor(name) {
    this.name = name;
  }
  run() {
    // 跑🏃
  }
  shoot() {
    // 射击🔫
  }
  mega() {
    // 大招💥
  }
}

class R extends Game {
  constructor() {
    // R 游戏
  }
}

class L extends Game {
  constructor() {
    // L 游戏
  }
}

const r = new R("r");
r.run();
r.shoot();
r.mega();

// 精简
class Game {
  constructor(name) {
    this.name = name;
  }
  run() {
    // 跑🏃
  }
}
