// 300. 最长递增子序列
function lengthOfLIS(nums: number[]): number {
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
