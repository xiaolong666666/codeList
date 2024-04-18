// 去抖:在一定时间内，如果没有再次触发这个函数，才去真正的去执行函数
const debounce = (func, delay) => {
  let timer = null;

  return function () {
    const context = this;
    const args = [...arguments];
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

// 节流:如果一个函数持续的，频繁地触发，在一定时间间隔内只允许执行一次
const throttle = (func, delay) => {
  // let prev = Date.now()

  // return function () {
  //   const context = this;
  //   const args = [...arguments];
  //   let now = Date.now();
  //   if (now - prev > delay) {
  //     func.apply(context, args);
  //     prev = now;
  //   }
  // };

  let flag = true;

  return function () {
    const context = this;
    const args = [...arguments];
    if (flag) {
      setTimeout(() => {
        func.apply(context, args);
        flag = true;
      }, delay);
      flag = false;
    }
  };
};
