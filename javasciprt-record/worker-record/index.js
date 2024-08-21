const box = document.querySelector(".box");
const stop = document.querySelector(".stop");

let right = true;
const mark = setInterval(() => {
  const left = getComputedStyle(box).left;
  let leftNum = parseFloat(left);
  if (leftNum === 200) right = false;
  if (leftNum === 0) right = true;
  if (right) {
    leftNum++;
  } else {
    leftNum--;
  }

  box.style.left = `${leftNum}px`;
}, 5);

setTimeout(() => {
  const worker = new Worker("worker.js");
  worker.postMessage("start");
  worker.onmessage = (event) => {
    box.innerHTML = event.data;
  };
}, 1000);

stop.addEventListener("click", () => {
  clearInterval(mark);
});
