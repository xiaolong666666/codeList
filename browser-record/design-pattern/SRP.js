// 单一职责原则【Single Responsibility Principle】
// 目标🎯：一个功能只做一件事

// sprint
// game store
class LOLManager {
  openDialog() {
    // 弹出折扣
    setPrice();
  }
}

const game = new LOLManager();
game.openDialog(); // 弹框 <=> 计算金额  两者耦合

// 重构
// 业务层
class LOLManager {
  constructor(command) {
    this.command = command;
  }
  openDialog(price) {
    this.command.setPrice(price);
  }
}

// 逻辑层
class PriceManager {
  setPrice(price) {
    // 计算金额
  }
  calcDiscount() {
    // 计算折扣
  }
}

// 功能运行
const execute = new PriceManager();
const lol = new LOLManager(execute);
lol.openDialog(15);
execute.setPrice(20);
