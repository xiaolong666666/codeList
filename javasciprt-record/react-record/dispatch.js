// v18 dispatch

function testTask() {
  console.log("begionWork A");
  return () => {
    console.log("begionWork B");
    return () => {
      console.log("begionWork C");
      return () => {
        console.log("begionWork D");
        return () => {
          console.log("begionWork E...");
        };
      };
    };
  };
}

const queue = [{ cb: testTask }];
const peek = (arr) => arr[0];

let deadline;
const threshold = 5;
const now = Date.now();
const transition = [];

const postMessage = () => {
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = () => transition?.splice(0, 1).forEach((f) => f());
  port2.postMessage();
};

function startTransition(cb) {
  // 让出执行权，在下一个时间切片，接着执行 flush 函数
  transition.push(cb) && postMessage();
}

function shouldYield() {
  // 5 ms到了，或者有更高的任务：用户输入
  return Date.now() >= deadline || navigator.scheduling.isInputPending();
}

// 时间分片
function flush() {
  // 需在 5 s 内让出执行权
  deadline = now + threshold;
  // 计时开始，执行任务
  let task = peek(queue);

  while (task && !shouldYield()) {
    const { cb } = task;
    task.cb = null; // queue = [{ cb: null }]

    // 执行任务
    const next = cb();
    if (next && typeof next === "function") {
      // 未执行完，放进去
      task.cb = next;
    } else {
      // 执行完
      queue.shift();
      task = null;
    }
  }

  // 什么时候会跳出 while ？
  // 1. 任务执行完
  // 2. 时间片用完 没有执行权

  task && startTransition(flush);
}

flush();
