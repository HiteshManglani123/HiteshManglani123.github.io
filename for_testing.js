const palindrome = (string) => {
  return string
      .split('')
      .reverse()
      .join('');
};

const generateMaze = (row, col) => {
  const rows = [];

  for (let i = 0; i < row; i++) {
    rows.push(Array.from(Array(col), () => 0));
  }
  rows[13][15] = 2;
  rows[13][45] = 3;
  return rows;
};

const generateEvenMaze = (row, col) => {
  const rows = [];

  for (let i = 0; i < row; i++) {
    if (i % 2 == 0) {
      rows.push(Array.from(Array(col), () => 0));
    } else {
      rows.push(Array.from(Array(col), () => 1));
    }
  }
  rows[13][15] = 2;
  rows[13][45] = 3;
  return rows;
};

module.exports = {
  palindrome,
  generateMaze,
  generateEvenMaze,
};
