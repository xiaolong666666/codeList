// 里氏替换原则【Liskov Substitution Principle】
// 目标🎯：子类始终可以覆盖父类，父类能够出现的地方子类一定能够出现

// sprint 1 PC
class Game {
  constructor(name) {
    this.name = name;
  }
  start() {
    // 开机
  }
  shutdown() {
    // 关机
  }
  play() {
    // 进行游戏
  }
}

const game = new Game();
game.play();

// sprint 2 PC + Mobile
class MobileGame extends Game {
  constructor(name) {
    super(name);
  }
  // 墓碑机制：当前游戏状态放置在后台
  tombStore() {
    // tomb
  }
  play() {
    // 进行移动端游戏
    // ❌ 移动端不应该继承pc端（移动端 和 pc端 是平级）
  }
}

// 重构
class Game {
  constructor(name) {
    this.name = name;
  }
  start() {
    // 开机
  }
  shutdown() {
    // 关机
  }
}

class PCGame extends Game {
  constructor(name) {
    super(name);
  }
  // 墓碑机制：当前游戏状态放置在后台
  speed() {
    // speed
  }
  play() {
    // 进行PC端游戏
  }
}

class MobileGame extends Game {
  constructor(name) {
    super(name);
  }
  // 墓碑机制：当前游戏状态放置在后台
  tombStore() {
    // tomb
  }
  play() {
    // 进行移动端游戏
  }
}
