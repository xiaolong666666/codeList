// 参考：https://www.cnblogs.com/AlbertP/p/10847627.html
// 复杂度：https://blog.csdn.net/weixin_30376453/article/details/96576126

// 调换元素位置
const swap = (arr, i, j) => {
  // const temp = arr[i]
  // arr[i] = arr[j]
  // arr[j] = temp
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

// 冒泡排序
// 每次循环都找出当前最大的一个放在后面
const bubbleSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let unSwapped = true;
    for (let j = 1; j < len - i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
        unSwapped = false;
      }
    }
    if (unSwapped) break;
  }

  return arr;
};

// 选择排序
// 每次循环找出当前最小的一个放在前面
const selectSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    if (minIndex !== i) swap(arr, i, minIndex);
  }

  return arr;
};

// 插入排序
// 类似于打扑克时摸一张去插入目前顺序的合适位置
const insertSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let prevIndex = i - 1;
    while (prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex];
      prevIndex--;
    }
    arr[prevIndex + 1] = current;
  }

  return arr;
};

// 希尔排序
// 分步长的插入排序
const shellSort = (arr) => {
  for (
    let step = Math.floor(arr.length / 2);
    step > 0;
    step = Math.floor(step / 2)
  ) {
    for (let i = step; i < arr.length; i += step) {
      const current = arr[i];
      let prevIndex = i - step;
      while (prevIndex >= 0 && arr[prevIndex] > current) {
        arr[prevIndex + step] = arr[prevIndex];
        prevIndex -= step;
      }
      arr[prevIndex + step] = current;
    }
  }

  return arr;
};

// !!!快速排序（递归、递）
// 递过程中以随机一个数作为基数区别 left & right
const quickSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return arr;
  const random = arr[Math.floor(Math.random() * len)];
  const left = [];
  const middle = [];
  const right = [];
  for (let i = 0; i < len; i++) {
    if (arr[i] < random) left.push(arr[i]);
    else if (arr[i] > random) right.push(arr[i]);
    else middle.push(arr[i]);
  }

  return quickSort(left).concat(middle, quickSort(right));
};
// 先确定一个基数，两个指针（l,r），移动交换位置（递归）  !!!start > end return（始终保持start < end）
// const quickSort = (arr, start = 0, end = arr.length - 1) => {
//   if (start > end) return;
//   let l = start;
//   let r = end;
//   const base = arr[start];
//   while (l < r) {
//     while (l < r && arr[r] >= base) r--;
//     while (l < r && arr[l] <= base) l++;
//     if (l < r) swap(arr, l, r);
//   }
//   console.log(l, r, arr);
//   swap(arr, start, r);
//   quickSort(arr, start, r - 1);
//   quickSort(arr, l + 1, end);
// };

// 归并排序（递归、合并）
// 把数组从中间拆分为前后两部分（递归），再将排好序的前后两部分合并为一个数组
const mergeSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return arr;
  const middle = Math.floor(len / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const merge = (left, right) => {
    const result = [];
    while (left.length && right.length) {
      result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }
    if (left.length) {
      result.push(...left);
    }
    if (right.length) {
      result.push(...right);
    }
    return result;
  };

  return merge(mergeSort(left), mergeSort(right));
};

// 堆排序
// 先依次调整每个小树的父节点为最大值 => 顶堆为最大值 => “顶堆”与“数组最末尾”交换位置
//    => i = len - 1 开始循环，每次找出最大顶堆 => 再次交换位置 & len-- => i === 0 结束
const heapSort = (arr) => {
  var len = arr.length;

  // 堆调整
  const heapify = (i) => {
    let left = 2 * i + 1;
    right = left + 1;
    largest = i;
    if (arr[left] > arr[largest] && left < len) largest = left;
    if (arr[right] > arr[largest] && right < len) largest = right;
    if (largest !== i) {
      swap(arr, i, largest);
      heapify(largest); // 如果父节点有变化，（交换的子节点）为父节点的节点需要要重新进行堆调整
    }
  };

  // 大顶堆（父节点大于子节点）
  const buildMaxHeap = (arr) => {
    for (let i = Math.floor((len - 2) / 2); i >= 0; i--) heapify(i);
  };
  buildMaxHeap(arr);
  // 保证顶堆最大
  for (let i = arr.length - 1; i > 0; i--) {
    // console.log(arr)
    swap(arr, i, 0);
    len--;
    heapify(0);
  }
};

// 桶排序（核心在于分桶）
const bucketlSort = (arr, bucketCapacity = 5) => {
  let max = (min = arr[0]);
  for (let v of arr) {
    max = v > max ? v : max;
    min = v < min ? v : min;
  }
  const bucketCount = Math.ceil((max - min + 1) / bucketCapacity);
  const bucket = new Array(bucketCount);
  for (let v of arr) {
    const index = Math.floor((v - min) / bucketCapacity);
    if (!bucket[index]) bucket[index] = [];
    bucket[index].push(v);
  }
  for (let i in bucket) {
    insertSort(bucket[i]);
  }
  for (let i in bucket.flat()) {
    arr[i] = bucket.flat()[i];
  }
};

// 计数排序（桶排序特殊情况，范围比较小的）
// 将数据值转换为键存储在额外开辟的数组空间中，然后再按开辟的数组空间排序（有确定范围的整数）
const countSort = (arr) => {
  let index = 0;
  const max = Math.max(...arr);
  const additional_length = max + 1;
  const additional = new Array(additional_length);
  for (let v of arr) {
    if (!additional[v]) {
      additional[v] = 0;
    }
    additional[v]++;
  }
  for (let i = 0; i < additional_length; i++) {
    while (additional[i] > 0) {
      arr[index++] = i;
      additional[i]--;
    }
  }
  return arr;
};

// 基数排序（需要按位分隔）
const radixSort = (arr) => {
  const length = arr.length;
  const max = Math.max(...arr);
  const maxDigit = String(max).length;
  var carry = 10;
  var bit = 1;
  for (let i = 0; i < maxDigit; i++, carry *= 10, bit *= 10) {
    const counter = [];
    let index = 0;
    for (let j = 0; j < arr.length; j++) {
      let bucket = Math.floor((arr[j] % carry) / bit);
      if (!counter[bucket]) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    for (let k = 0; k < counter.length; k++) {
      if (!!counter[k]) {
        while (!!counter[k][0]) {
          arr[index++] = counter[k].shift();
        }
      }
    }
  }
};
