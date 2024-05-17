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
  let root = new TreeNode(list[0]);
  let nodeList = [root];
  for (let i = 1; i < list.length; i++) {
    if (list[i] === null) continue;
    const currentNode = new TreeNode(list[i]);
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

// 前序遍历
function preOrder(node) {
  if (!node) return;
  console.log(node.val);
  preOrder(node.left);
  preOrder(node.right);
}
// preOrder(root);

// 中序遍历
function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
}
// inOrder(root);

// 后序遍历
function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
}
// postOrder(root);

// 层序遍历 https://leetcode.cn/problems/binary-tree-level-order-traversal/
function levelOrder(node) {
  if (!node) return [];
  let queue = [node];
  let result = [];
  while (queue.length) {
    const tempQueue = [];
    const tempResult = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const currentNode = queue.shift();
      tempResult.push(currentNode.val);
      currentNode.left && tempQueue.push(currentNode.left);
      currentNode.right && tempQueue.push(currentNode.right);
    }
    queue = tempQueue;
    result.push(tempResult);
  }

  return result;
}
// console.log(levelOrder(root));

// 二叉树深度 leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/description/
function calculateDepth(node) {
  if (!node) return 0;
  const leftDepth = calculateDepth(node.left);
  const rightDepth = calculateDepth(node.right);
  return Math.max(leftDepth, rightDepth) + 1;
}
// console.log(calculateDepth(root));

// https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/description/?envType=daily-question&envId=2024-04-24
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
// amountOfTime(root, 3);

/* 105
从前序与中序遍历序列构造二叉树
https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ */
