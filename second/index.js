function minimumAbsoluteDifference(nums) {
  const n = nums.length / 2;
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  // Initialize a 2D array to store whether a sum is achievable
  const dp = Array.from({ length: n + 1 }, () =>
    Array(Math.round(totalSum / 2) + 1).fill(false)
  );
  dp[0][0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= totalSum / 2; j++) {
      // Check if it's possible to achieve the current sum
      dp[i][j] = dp[i - 1][j];
      if (j >= nums[i - 1]) {
        dp[i][j] |= dp[i - 1][j - nums[i - 1]];
      }
    }
  }

  // Find the closest sum to half of the total sum
  let closestSum = 0;
  for (let j = totalSum / 2; j >= 0; j--) {
    if (dp[n][j]) {
      closestSum = j;
      break;
    }
  }

  // Calculate the minimum absolute difference
  const minAbsDiff = Math.abs(totalSum - 2 * closestSum);
  return minAbsDiff;
}

// Example usage:
console.log(minimumAbsoluteDifference([3, 9, 7, 3])); // Output: 2
console.log(minimumAbsoluteDifference([-36, 36])); // Output: 72
console.log(minimumAbsoluteDifference([2, -1, 0, 4, -2, -9])); // Output: 0
