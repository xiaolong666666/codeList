/* 39
组合总和
https://leetcode.cn/problems/combination-sum/description/ */

/* 40
组合总和 II
https://leetcode.cn/problems/combination-sum-ii/ */

/* 46
全排列
https://leetcode.cn/problems/permutations/submissions/ */

/* 47
全排列 II
https://leetcode.cn/problems/permutations-ii/description/ */

/* 77
组合
https://leetcode.cn/problems/combinations/submissions/532205229/ */

/* 51
N 皇后
https://leetcode.cn/problems/n-queens/description/ */
function solveNQueens(n) {
  let res = [];
  const chessboard = Array.from({ length: n }, () => new Array(n).fill("."));

  function isValid(arr, row, col) {
    // ⬆️⬇️对比
    for (let i = 0; i < row; i++) {
      if (arr[i][col] === "Q") return false;
    }

    // ↙️↗️上对比
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (arr[i][j] === "Q") return false;
    }

    // ↖️↘️上对比
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (arr[i][j] === "Q") return false;
    }

    return true;
  }

  function backTrack(arr, row) {
    if (row === n) {
      res.push(arr.map((v) => v.join("")));
    }

    for (let i = 0; i < n; i++) {
      if (isValid(arr, row, i)) {
        arr[row][i] = "Q"; // ? 先使用
        backTrack(arr, row + 1);
        arr[row][i] = "."; // ? 再剔除
      }
    }
  }

  backTrack(chessboard, 0);

  return res;
}
solveNQueens(4);
