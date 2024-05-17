// 3. 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
  let longest = 0;
  let start = 0;
  let idx = 0;
  const map = new Map();

  while (idx < s.length) {
    if (map.has(s[idx])) {
      start = Math.max(map.get(s[idx]) + 1, start);
    }
    map.set(s[idx], idx);
    longest = Math.max(idx - start + 1, longest);
    idx++;
  }

  return longest;
}

// 11. 盛最多水的容器
function maxArea(height) {
  let maxArea = 0;
  let l = 0;
  let r = height.length - 1;
  while (l < r) {
    maxArea = Math.max((r - l) * Math.min(height[r], height[l]), maxArea);
    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return maxArea;
}

/* 240
搜索二维矩阵 II
https://leetcode.cn/problems/search-a-2d-matrix-ii/description/ */
