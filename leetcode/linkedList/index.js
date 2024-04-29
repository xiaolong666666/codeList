// Definition for singly-linked list.
class ListNode {
  val;
  next;
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const arr = [1, 2, 3, 4, 5];

// 数组转链表
const createLinkedList = (list) => {
  const head = new ListNode(list[0]);
  let currentNode = head;
  for (let i = 1; i < list.length; i++) {
    currentNode.next = new ListNode(list[i]);
    currentNode = currentNode.next;
  }

  return head;
};

const head = createLinkedList(arr);
console.log(head);

// 环装链表 https://leetcode.cn/problems/linked-list-cycle/description/
const hasCycle = (head) => {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }

  return false;
};
