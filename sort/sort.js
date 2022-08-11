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

// 插入排序
// 类似于打扑克时摸一张去插入目前顺序的合适位置
const insertSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]
    let prevIndex = i - 1
    while(prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex+1] = arr[prevIndex]
      prevIndex--
    }
    arr[prevIndex+1] = current
  }
}

// 希尔排序
// 分步长的插入排序
const shellSort = (arr) => {
  for(let step = arr.length / 2; step > 0; step = Math.floor(step / 2)) {
    for (let i = step; i < arr.length; i += step) {
      const current = arr[i]
      let prevIndex = i - step
      while(prevIndex >= 0 && arr[prevIndex] > current) {
        arr[prevIndex+step] = arr[prevIndex]
        prevIndex -= step
      }
      arr[prevIndex+step] = current
    }
  }
}

// 快速排序
// 先确定一个基数，两个指针(l,r)，移动交换位置(递归)  !!!start > end return(始终保持start < end)
const quickSort = (arr, start = 0, end = arr.length - 1) => {
  if (start > end) return
  let l = start
  let r = end
  const base = arr[start]
  while(l < r) {
    while (l < r && arr[r] >= base) r--
    while (l < r && arr[l] <= base) l++
    if (l < r) swap(arr, l, r)
  }
  swap(arr, start, r)
  quickSort(arr, start, r - 1)
  quickSort(arr, l + 1, end)
}