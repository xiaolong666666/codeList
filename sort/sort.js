// 调换元素位置
const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 冒泡排序
// 每次循环都找出当前最大的一个放在后面
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j-1] > arr[j]) swap(arr, j-1, j)
    }
  }
}

// 选择排序
// 每次循环找出当前最小的一个放在前面
const selectSort = (arr) => {
  let minIndex
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) swap(arr, i, minIndex)
  }
}