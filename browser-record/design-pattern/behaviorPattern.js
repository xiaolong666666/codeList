// 行为型
// 不同对象之间划分责任和算法的抽象化

// 命令模式
// 请求以命令的形式包裹在对象中，并传给调用方

// sprint1 游戏角色控制
(() => {
  // 接收者
  class Receiver {
    execute() {
      console.log("🏃...");
    }
  }

  // 指令器
  class Command {
    constructor(receiver) {
      this.receiver = receiver;
    }
    execute() {
      this.receiver.execute();
    }
  }

  // 触发者
  class Operator {
    constructor(command) {
      this.command = command;
    }
    run() {
      console.log("run");
      this.command.execute();
    }
  }

  const soldier = new Receiver("soldier");
  const command = new Command(soldier);
  const player = new Operator(command);
  player.run();
})();

// 观察者模式
// 当一个属性发生状态改变的时候，观察者连续引发所有相关状态的改变
(() => {
  class MediaCenter {
    constructor() {
      this.state = "";
      this.observers = [];
    }
    attach(observer) {
      this.observers.push(observer);
    }
    getState() {
      return this.state;
    }
    setState(state) {
      this.state = state;
      this.notifyAllObservers();
    }
    notifyAllObservers() {
      this.observers.forEach((observer) => observer.update());
    }
  }

  class Observer {
    constructor(name, center) {
      this.name = name;
      this.center = center;
      this.center.attach(this);
    }
    update() {
      console.log(`${this.name}: updated; state: ${this.center.getState()}`);
    }
  }

  const mediaCenter = new MediaCenter();
  const ps = new Observer("ps", mediaCenter);
  const tv = new Observer("tv", mediaCenter);
  mediaCenter.setState("on");
})();

// 职责链
// 1. 链式调用 2. 职责独立 3. 顺序执行
(() => {
  class Action {
    constructor(name) {
      this.name = name;
      this.nextAction = null;
    }
    setNextAction(action) {
      this.nextAction = action;
    }
    handle() {
      console.log(`${this.name}请审批请假申请`);
      if (this.nextAction) {
        this.nextAction.handle();
      } else {
        console.log(`请假申请通过`);
      }
    }
  }

  const dad = new Action("dad");
  const mom = new Action("mom");
  const sister = new Action("sister");
  dad.setNextAction(mom);
  mom.setNextAction(sister);

  dad.handle();
})();
