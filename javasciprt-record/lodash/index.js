const groupBy = (arr, fn) =>
  arr.reduce(
    (target, current) => (
      // 逗号运算符
      (target[fn(current)] = [...(target[fn(current)] ?? []), current]), target
    ),
    {}
  );

console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
