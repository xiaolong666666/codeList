// ABCD/东南西北
const sortRegion = (list) => {
  const charList = ["A", "B", "C", "D"];
  const orientationList = ["东", "南", "西", "北"];
  list.sort(
    (regionX, regionY) =>
      charList.indexOf(regionX[0]) - charList.indexOf(regionY[0]) ||
      orientationList.indexOf(regionX[2]) - orientationList.indexOf(regionY[2])
  );
};

const arr = [
  "A华北",
  "A华南",
  "B华南",
  "A华东",
  "B华东",
  "A华西",
  "C华北",
  "C华东",
];

sortRegion(arr);
console.log(arr);
