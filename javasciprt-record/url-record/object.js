const list = [
  { name: "tom" },
  { name: "jarry" },
  { name: "ali" },
  { age: "18" },
  { age: "16" },
  { age: "17" },
  { sex: "boy" },
  { sex: "gril" },
  { sex: "boy" },
];

const getObjectFormat = (list) => {
  const allSet = new Set();
  let result = [];
  list.forEach((item) => {
    const key = Object.keys(item)[0];
    let assginFlag = true;
    if (!allSet.has(key)) allSet.add(key);
    result.forEach((_item) => {
      if (assginFlag && !Object.keys(_item).includes(key)) {
        Object.assign(_item, item);
        assginFlag = false;
      }
    });
    if (assginFlag) result.push(item);
  });
  console.log({ allSet });
  console.log({ result });
  return result;
};
