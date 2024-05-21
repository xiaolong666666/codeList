/* 62
不同路径
https://leetcode.cn/problems/unique-paths/description/ */

/* 63
不同路径 II
https://leetcode.cn/problems/unique-paths-ii/description/ */

/* 64
最小路径和
https://leetcode.cn/problems/minimum-path-sum/description/ */

/* 70
爬楼梯
https://leetcode.cn/problems/climbing-stairs/description/ */

/* 300
最长递增子序列
https://leetcode.cn/problems/longest-increasing-subsequence/description/ */
https: function lengthOfLIS(nums) {
  const dp = [];
  dp[0] = 1;
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = dp[j] + 1 > dp[i] ? dp[j] + 1 : dp[i];
      }
    }
    max = dp[i] > max ? dp[i] : max;
  }

  return max;
}

/* 309
买卖股票的最佳时机含冷冻期
https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/ */
