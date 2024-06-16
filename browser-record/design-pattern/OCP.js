// 开闭原则【Open Close Principle】
// 目标🎯：已有场景下，对于需要拓展的功能进行开放，拒绝直接的功能修改

// sprint 1 父亲节活动【游戏wukong需要高亮，LOL需要弹出折扣】
// render
if (game === "wukong") {
  // 高亮
} else {
  // ...
}

// event
if (game === "LOL") {
  // 弹出折扣
} else {
  // ...
}

// sprint 2 【游戏R需要置灰下架 + 付款页面提示停止发售】
// render
if (game === "wukong") {
  // 高亮
} else if (game === "R") {
  // 置灰
} else {
  // ...
}

// event
if (game === "LOL") {
  // 弹出折扣
} else if (game === "R") {
  // 提示停止发售
} else {
  // ...
}

// 面条代码 => 重构 => 分配
// render
gameManager(game).setColor();

//event
gameManager(game).openDialog();

function gameManager(game) {
  return `${game}Manager`; // LOL wukong R ...
}

class Game {
  constructor(name) {
    this.name = name;
  }
  setColor() {
    // 默认
  }
  openDialog() {
    // 默认
  }
}

class LOL extends Game {
  openDialog() {
    // 弹出折扣
  }
}

class wukong extends Game {
  setColor() {
    // 高亮
  }
}

class R extends Game {
  setColor() {
    // 置灰
  }
  openDialog() {
    // 提示停止发售
  }
}
