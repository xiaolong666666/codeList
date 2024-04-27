// https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/description/?envType=daily-question&envId=2024-04-24

// Definition for a binary tree node.
class TreeNode {
  val;
  left;
  right;
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const arr = [1, 5, 3, null, 4, 10, 6, 9, 2];

// 数组转二叉树
const createBinaryTree = (list) => {
  let root = new TreeNode(arr[0]);
  let nodeList = [root];
  for (let i = 1; i < list.length; i++) {
    if (arr[i] === null) continue;
    const currentNode = new TreeNode(arr[i]);
    nodeList.push(currentNode);
    const parentIdx = ~~((i - 1) / 2);
    const parentNode = nodeList[parentIdx];
    if (i % 2) {
      parentNode.left = currentNode;
    } else {
      parentNode.right = currentNode;
    }
  }
  return root;
};

const root = createBinaryTree(arr);
console.log(root);

function amountOfTime(root, start) {
  const graph = new Map(); // 解析为无向图
  const dfs = (node) => {
    [node.left, node.right].forEach((child) => {
      if (!!child) {
        graph.set(
          node.val,
          graph.get(node.val)?.concat(child.val) ?? [child.val]
        );
        graph.set(
          child.val,
          graph.get(child.val)?.concat(node.val) ?? [node.val]
        );
        dfs(child);
      }
    });
  };
  dfs(root);

  const queue = [[start, 0]];
  const visited = new Set([start]);
  let time = 0;
  while (queue.length) {
    const [val, currentTime] = queue.shift();
    time = currentTime;
    const children = graph.get(val);
    children?.forEach((child) => {
      if (!visited.has(child)) {
        visited.add(child);
        queue.push([child, currentTime + 1]);
      }
    });
  }
  return time;
}

amountOfTime(root, 3);
