// 使用 requestAnimationFrame 创建一个简单的动画

let right = true;

// 动画函数
function animate() {
  // 假设我们有一个元素需要根据时间移动
  let element = document.getElementById("animated-element");
  const preLeft = parseInt(getComputedStyle(element).left, 10);

  // 根据时间增加位置
  if (preLeft === window.innerWidth - 100 - 16) {
    right = false;
  }
  if (preLeft === 8) {
    right = true;
  }

  element.style.left = (right ? preLeft + 1 : preLeft - 1) + "px";

  // 无限递归调用自己以创建连续的动画
  requestAnimationFrame(animate);
}

// 在页面加载后开始动画
window.onload = function () {
  requestAnimationFrame(animate);
};
